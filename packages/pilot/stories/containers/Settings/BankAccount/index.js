import React, { Component } from 'react'
import { merge } from 'ramda'
import { action } from '@storybook/addon-actions'

import BankAccount from '../../../../src/containers/Settings/BankAccount'

const selectedAccountMock = {
  agencia: '3783',
  agencia_dv: '0',
  bank_code: '341',
  conta: '69885',
  conta_dv: '9',
  document_number: '38171338046',
  document_type: 'cpf',
  id: 17621079,
  legal_name: 'bank account name',
  type: 'conta_corrent',
}

const accountsMock = [
  {
    agencia: '3783',
    agencia_dv: '0',
    bank_code: '341',
    conta: '69885',
    conta_dv: '9',
    document_number: '38171338046',
    document_type: 'cpf',
    id: 17621079,
    legal_name: 'Bank legal name',
    type: 'conta_corrent',
  },
  {
    agencia: '3896',
    agencia_dv: '0',
    bank_code: '341',
    conta: '19071',
    conta_dv: '1',
    document_number: '24720941087',
    document_type: 'cpf',
    id: 17621078,
    legal_name: 'Bank cool name',
    type: 'conta_corrent',
  },
]

const defaultErrorData = {
  account: '',
  accountCd: '',
  agency: '',
  agencyCd: '',
  bankCode: '',
  type: '',
}

const selectAction = action('selection')
const cancelAction = action('cancel')
const changeAction = action('change')
const submitAction = action('submit')

class BankAccountExample extends Component {
  constructor () {
    super()

    this.state = {
      accounts: accountsMock,
      data: {
        account: '',
        accountCd: '',
        agency: '',
        agencyCd: '',
        bankCode: '',
        documentNumber: '26268738888',
        legalName: 'API BANK ACCOUNT',
        type: '',
      },
      disabled: true,
      selectedAccount: selectedAccountMock,
    }

    this.handleAccountSelect = this.handleAccountSelect.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAccountSelect (id) {
    const { accounts } = this.state
    const selectedAccount = accounts.find(account => account.id === id)

    this.setState({
      selectedAccount,
    }, () => selectAction(this.state))
  }

  handleCancel () {
    this.setState({
      data: {
        account: '',
        accountCd: '',
        agency: '',
        agencyCd: '',
        bankCode: '',
        documentNumber: '26268738888',
        legalName: 'API BANK ACCOUNT',
        type: '',
      },
      disabled: true,
      errors: defaultErrorData,
    }, () => cancelAction(this.state))
  }

  handleChange (data, errors) {
    const { data: stateDate } = this.state

    this.setState({
      data: merge(stateDate, data),
      disabled: false,
      errors,
    }, () => changeAction(this.state))
  }

  handleSubmit (data, errors) {
    const { data: stateData } = this.state

    if (!errors) {
      this.setState({
        data: merge(stateData, data),
        disabled: true,
        errors: defaultErrorData,
      }, () => submitAction(this.state))
    }
  }

  render () {
    const {
      accounts,
      data,
      disabled,
      errors,
      selectedAccount,
    } = this.state

    return (
      <BankAccount
        accounts={accounts}
        data={data}
        errors={errors}
        disabled={disabled}
        onAccountSelect={this.handleAccountSelect}
        onCancel={this.handleCancel}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        selectedAccount={selectedAccount}
        t={t => t}
      />
    )
  }
}

export default BankAccountExample
