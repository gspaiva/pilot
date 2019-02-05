import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import {
  compose,
  assocPath,
  pipe,
} from 'ramda'

import moment from 'moment'
import mock from '../../../../src/containers/Balance/mock.json'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockBalance = {
  anticipation: {
    available: 10000,
    error: false,
    loading: false,
  },
  dates: {
    end: moment().add(1, 'month'),
    start: moment(),
  },
  ...mock.result,
  query: {
    dates: {
      end: moment().add(1, 'month'),
      start: moment(),
    },
    page: 1,
  },
  total: {
    net: 1000000,
    outcoming: 1000000,
    outgoing: 1000000,
  },
  currentPage: 1,
  disabled: false,
  onAnticipationClick: () => {},
  onCancel: () => {},
  onCancelRequestClick: () => {},
  onFilterClick: () => {},
  onPageChange: () => {},
  onSave: () => {},
  onWithdrawClick: () => {},
}

const mapStateToProps = (state) => {
  const { account } = state
  const { client } = account

  return {
    client,
  }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.requestClient = this.requestClient.bind(this)
    this.handleSaveAnticipation = this.handleSaveAnticipation.bind(this)
    this.handleSaveTransfer = this.handleSaveTransfer.bind(this)
    this.handleSaveBankAccount = this.handleSaveBankAccount.bind(this)
    this.handleSaveBankAccountWithId = this.handleSaveBankAccountWithId.bind(this)
    this.handleSaveBankAccountWithBank = this.handleSaveBankAccountWithBank.bind(this)
  }

  componentDidMount () {
    this.requestClient()
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

  handleSaveTransfer (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, {
      configuration: {
        ...data,
        anticipationModel: null,
      },
    })
      .then(() => {
        const updatedTrasnferConfig = assocPath([
          'recipientData',
          'configurationData',
          'transfer'],
        data,
        this.state
        )
        this.setState(updatedTrasnferConfig)
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

  requestClient () {
    const { client } = this.props
    const { id } = this.props.match.params

    client.recipient.detail(id)
      .then((recipient) => {
        const recipientIdentification = recipient.informationData.identification

        return Promise.all([
          recipient,
          client.recipient.bankAccount(recipientIdentification),
        ])
      })
      .then(([recipient, { accounts }]) => {
        const recipientWithAccounts = assocPath(
          ['configurationData', 'accounts'],
          accounts,
          recipient
        )
        this.setState({
          recipientData: recipientWithAccounts,
        })
      })
  }

  render () {
    if (this.state.recipientData) {
      return (
        <DetailRecipient
          informationProps={this.state.recipientData.informationData}
          balanceProps={mockBalance}
          configurationProps={{
            ...this.state.recipientData.configurationData,
            handleSaveAnticipation: this.handleSaveAnticipation,
            handleSaveTransfer: this.handleSaveTransfer,
            handleSaveBankAccount: this.handleSaveBankAccount,
          }}
          recipient={this.state.recipientData.companyData}
          t={this.props.t}
        />
      )
    }
    return null
  }
}

DetailRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
