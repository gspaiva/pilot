import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  assocPath,
  compose,
  lensPath,
  pipe,
  propEq,
  reject,
  view,
} from 'ramda'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockBalance = {
  onCancel: () => {},
  onSave: () => {},
}

const mapStateToProps = (state = {}) => {
  const { account } = state
  const { client } = account || {}
  return { client }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      anticipationLimit: 0,
      balance: {},
      currentPage: 1,
      dates: {
        end: moment().add(1, 'month'),
        start: moment(),
      },
      total: {},
      error: false,
      loading: true,
      recipientData: {},
    }

    this.fetchAnticipationLimit = this.fetchAnticipationLimit.bind(this)
    this.fetchBalance = this.fetchBalance.bind(this)
    this.fetchBalanceTotal = this.fetchBalanceTotal.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.fetchRecipientData = this.fetchRecipientData.bind(this)
    this.handleAnticipationCancel = this.handleAnticipationCancel.bind(this)
    this.handleDateFilter = this.handleDateFilter.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSaveAnticipation = this.handleSaveAnticipation.bind(this)
    this.handleSaveBankAccount = this.handleSaveBankAccount.bind(this)
    this.handleSaveBankAccountWithBank = this.handleSaveBankAccountWithBank.bind(this)
    this.handleSaveBankAccountWithId = this.handleSaveBankAccountWithId.bind(this)
    this.handleSaveTransfer = this.handleSaveTransfer.bind(this)
    this.sendToAnticipationPage = this.sendToAnticipationPage.bind(this)
    this.sendToWithdrawPage = this.sendToWithdrawPage.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  handleSaveAnticipation (data) {
    const { client } = this.props
    const { id } = this.props.match.params
    return client.recipient.update(id, { configuration: data })
      .then(() => {
        const updatedAnticipationConfig = assocPath([
          'recipientData',
          'configurationData',
          'anticipation'],
        data,
        this.state
        )
        this.setState(updatedAnticipationConfig)
      })
  }

  handleSaveTransfer (transferData) {
    const { client } = this.props
    const { id } = this.props.match.params
    const updatedData = {
      configuration: {
        ...transferData,
        anticipationModel: null,
      },
    }

    return client.recipient.update(id, updatedData)
      .then(() => {
        const transferPath = ['recipientData', 'configurationData', 'transfer']
        const updateTransfer = assocPath(transferPath, transferData)
        const updatedState = updateTransfer(this.state)
        this.setState(updatedState)
      })
  }

  handleSaveBankAccountWithId (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, { configuration: data })
  }

  handleSaveBankAccountWithBank (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    const { identification } = this.state.recipientData.informationData
    const { documentType } = identification

    return client.recipient.createNewAccount({
      identification: {
        documentType,
        [documentType]: this.state.recipientData.informationData.identification[documentType],
      },
      bankAccount: data,
    })
      .then((bankAccountCreated) => {
        const { accounts } = this.state.recipientData.configurationData
        this.setState({
          recipientData: {
            ...this.state.recipientData,
            configurationData: {
              ...this.state.recipientData.configurationData,
              accounts: [...accounts, bankAccountCreated],
            },
          },
        })

        return client.recipient.update(id, {
          configuration: {
            id: bankAccountCreated.id,
          },
        })
      })
  }

  handleSaveBankAccount (data) {
    let operation = Promise.resolve()

    if (data.id) {
      operation = this.handleSaveBankAccountWithId(data)
    } else if (data.bank) {
      operation = this.handleSaveBankAccountWithBank(data)
    }
    return operation
      .then((dataUpdated) => {
        this.setState(
          pipe(
            assocPath(['recipientData', 'configurationData', 'bankAccount'],
              dataUpdated.bank_account),
            assocPath(['recipientData', 'companyData', 'name'],
              dataUpdated.bank_account.name)
          )
        )
      })
  }

  handleDateFilter (dates) {
    const firstPage = 1
    return this.fetchBalance(dates, firstPage)
      .then((balance) => {
        this.setState({
          balance,
          currentPage: firstPage,
          dates,
        })
      })
  }

  handlePageChange (page) {
    const { dates } = this.state

    return this.fetchBalance(dates, page)
      .then((balance) => {
        this.setState({
          balance,
          currentPage: page,
          dates,
        })
      })
  }

  handleAnticipationCancel (anticipationId) {
    // TODO: Show confirmation modal
    const { client, match } = this.props
    const requestBody = {
      recipientId: match.params.id,
      id: anticipationId,
    }

    return client.bulkAnticipations.cancel(requestBody)
      .then((response) => {
        const requestPath = ['balance', 'requests']
        const getRequests = view(lensPath(requestPath))
        const removeCanceled = reject(propEq('id', response.id))

        const oldRequests = getRequests(this.state)
        const newRequests = removeCanceled(oldRequests)

        const updateRequests = assocPath(requestPath, newRequests)
        const newState = updateRequests(this.state)

        this.setState(newState)
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error,
        })
      })
  }

  fetchData () {
    const { dates, currentPage } = this.state

    const recipientDataPromise = this.fetchRecipientData()
    const anticipationLimitPromise = this.fetchAnticipationLimit()
    const balancePromise = this.fetchBalance(dates, currentPage)
    const balanceTotalPromise = this.fetchBalanceTotal(dates)

    return Promise.all([
      recipientDataPromise,
      anticipationLimitPromise,
      balancePromise,
      balanceTotalPromise,
    ])
      .then(([
        recipientData,
        anticipationLimit,
        balance,
        total,
      ]) => {
        this.setState({
          anticipationLimit,
          balance,
          loading: false,
          recipientData,
          total,
        })
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        })
      })
  }

  fetchRecipientData () {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.detail(id)
      .then((recipient) => {
        const { identification } = recipient.informationData
        const accountsPromise = client.recipient.bankAccount(identification)
        return Promise.all([recipient, accountsPromise])
      })
      .then(([recipient, bankAccounts]) => {
        const { accounts } = bankAccounts
        const accountsPath = ['configurationData', 'accounts']
        const addAccounts = assocPath(accountsPath, accounts)
        const recipientData = addAccounts(recipient)
        return recipientData
      })
  }

  fetchAnticipationLimit () {
    const { client } = this.props
    const { id } = this.props.match.params
    return client.recipient.anticipationLimits(id)
      .then(limits => limits.maximum.amount)
  }

  fetchBalance (dates, page) {
    const { client } = this.props
    const { id } = this.props.match.params
    const query = { dates, page, count: 10 }

    return client.balance.data(id, query)
      .then(response => response.result)
  }

  fetchBalanceTotal (dates) {
    const { client } = this.props
    const { id } = this.props.match.params
    const query = { dates }
    return client.balance.total(id, query)
  }

  sendToAnticipationPage () {
    const { history } = this.props
    const { id } = this.props.match.params
    history.push(`/anticipation/${id}`)
  }

  sendToWithdrawPage () {
    const { history } = this.props
    const { id } = this.props.match.params
    history.push(`/withdraw/${id}`)
  }

  render () {
    const {
      anticipationLimit,
      balance,
      currentPage,
      dates,
      error,
      loading,
      recipientData,
      total,
    } = this.state

    if (loading || error) return null

    const {
      informationData,
      configurationData,
      companyData,
    } = recipientData

    const { t } = this.props

    const anticipation = {
      available: anticipationLimit,
      error,
      loading,
    }

    return (
      <DetailRecipient
        informationProps={informationData}
        balanceProps={{
          ...mockBalance,
          ...balance,
          anticipation,
          currentPage,
          dates,
          disabled: loading,
          onAnticipationClick: this.sendToAnticipationPage,
          onCancelRequestClick: this.handleAnticipationCancel,
          onFilterClick: this.handleDateFilter,
          onPageChange: this.handlePageChange,
          onWithdrawClick: this.sendToWithdrawPage,
          total,
        }}
        configurationProps={{
          ...configurationData,
          handleSaveAnticipation: this.handleSaveAnticipation,
          handleSaveTransfer: this.handleSaveTransfer,
          handleSaveBankAccount: this.handleSaveBankAccount,
        }}
        recipient={companyData}
        t={t}
      />
    )
  }
}

DetailRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
    bulkAnticipations: PropTypes.shape({
      cancel: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
