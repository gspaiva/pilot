import React, { Component } from 'react'

import BankAccountSelector from '../../../../../src/containers/Settings/BankAccount/Selector'

class BankAccountSelectorExample extends Component {
  constructor () {
    super()

    this.state = {
      selectedAccountId: 1,
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (id) {
    this.setState({
      selectedAccountId: id,
    })
  }

  render () {
    return (
      <BankAccountSelector
        accounts={[
          {
            agencia: '378-3',
            agencia_dv: '0',
            bank_code: '341',
            conta: '69885',
            conta_dv: '9',
            id: 1,
            legal_name: 'Conta Principal',
            type: 'Conta corrente',
          },
          {
            agencia: '378-3',
            agencia_dv: '0',
            bank_code: '341',
            conta: '69885',
            conta_dv: '9',
            id: 2,
            legal_name: 'Conta Secundária',
            type: 'Conta corrente',
          },
        ]}
        onSelect={this.handleSelect}
        selectedAccountId={this.state.selectedAccountId}
        t={t => t}
      />
    )
  }
}

export default BankAccountSelectorExample
