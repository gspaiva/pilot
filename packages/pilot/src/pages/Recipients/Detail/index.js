import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import moment from 'moment'
import { Alert } from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import {
  assocPath,
  compose,
  lensPath,
  pathOr,
  pipe,
  propEq,
  reject,
  view,
} from 'ramda'

import ConfirmModal from '../../../../src/components/ConfirmModal'
import DetailRecipient from '../../../../src/containers/RecipientDetails'
import Loader from '../../../../src/components/Loader'

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
      anticipationError: false,
      anticipationLimitAmount: 0,
      anticipationToCancel: null,
      balance: {},
      currentPage: 1,
      dates: {
        start: moment().subtract(1, 'month'),
        end: moment(),
      },
      pageError: false,
      loading: true,
      recipientData: {},
      showModal: false,
      total: {},
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
    this.hideCancelAnticipationModal = this.hideCancelAnticipationModal.bind(this)
    this.sendToAnticipationPage = this.sendToAnticipationPage.bind(this)
    this.sendToWithdrawPage = this.sendToWithdrawPage.bind(this)
    this.showCancelAnticipationModal = this.showCancelAnticipationModal.bind(this)
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
    const balancePromise = this.fetchBalance(dates, firstPage)
    const balanceTotalPromise = this.fetchBalanceTotal(dates)

    return Promise.all([balancePromise, balanceTotalPromise])
      .then(([balance, total]) => {
        this.setState({
          balance,
          currentPage: firstPage,
          dates,
          total,
        })
      })
      .catch((pageError) => {
        this.setState({
          pageError,
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

  handleAnticipationCancel () {
    const { client, match } = this.props
    const requestBody = {
      recipientId: match.params.id,
      id: this.state.anticipationToCancel,
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

        this.setState({
          ...newState,
          anticipationToCancel: null,
          showModal: false,
        })
      })
      .catch((pageError) => {
        this.setState({
          ...this.state,
          anticipationToCancel: null,
          pageError,
          showModal: false,
        })
      })
  }

  showCancelAnticipationModal (anticipationId) {
    return this.setState({
      showModal: true,
      anticipationToCancel: anticipationId,
    })
  }

  hideCancelAnticipationModal () {
    return this.setState({
      showModal: false,
      anticipationToCancel: null,
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
        const { amount, error } = anticipationLimit
        this.setState({
          anticipationLimitAmount: amount,
          anticipationError: error,
          balance,
          loading: false,
          recipientData,
          total,
        })
      })
      .catch((pageError) => {
        this.setState({
          pageError,
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
      .then(limits => ({ amount: limits.maximum.amount, error: false }))
      .catch(error => ({ amount: 0, error }))
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
      anticipationError,
      anticipationLimitAmount,
      balance,
      currentPage,
      dates,
      pageError,
      loading,
      recipientData,
      showModal,
      total,
    } = this.state

    const { t } = this.props

    if (loading) {
      return <Loader visible />
    }

    if (pageError) {
      const unknownErrorMessage = t('unknown_error')
      const errorMessagePath = ['response', 'errors', 0, 'message']
      const getErrorMessage = pathOr(unknownErrorMessage, errorMessagePath)
      const errorMessage = getErrorMessage(pageError)

      return (
        <Alert icon={<IconInfo height={16} width={16} />} type="info">
          <span>{errorMessage}</span>
        </Alert>
      )
    }

    const {
      informationData,
      configurationData,
      companyData,
    } = recipientData

    const { transferEnabled } = configurationData.transfer

    const anticipation = {
      available: anticipationLimitAmount,
      error: anticipationError,
      loading,
      automaticTransfer: transferEnabled,
    }

    return (
      <Fragment>
        <DetailRecipient
          informationProps={informationData}
          balanceProps={{
            ...balance,
            anticipation,
            currentPage,
            dates,
            disabled: loading,
            onAnticipationClick: this.sendToAnticipationPage,
            onCancelRequestClick: this.showCancelAnticipationModal,
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
        <ConfirmModal
          cancelText={t('cancel_pending_request_cancel')}
          confirmText={t('cancel_pending_request_confirm')}
          isOpen={showModal}
          onCancel={this.hideCancelAnticipationModal}
          onConfirm={this.handleAnticipationCancel}
          title={t('cancel_pending_request_title')}
        >
          <div style={{ textAlign: 'center' }}>
            {t('cancel_pending_request_text')}
          </div>
        </ConfirmModal>
      </Fragment>
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
