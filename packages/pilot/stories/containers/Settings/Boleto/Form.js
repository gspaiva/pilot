import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import BoletoConfigurationForm from '../../../../src/containers/Settings/Boleto/Form'

class BoletoForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actionsDisabled: true,
      daysToAddInExpirationDate: '2',
      instructions: 'accept',
    }

    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onCancel () {
    this.setState({
      actionsDisabled: true,
      daysToAddInExpirationDate: '2',
      instructions: 'accept',
    }, () => action('Cancel')(this.state))
  }

  onChange ({ daysToAddInExpirationDate, instructions }) {
    this.setState(({
      actionsDisabled: false,
      daysToAddInExpirationDate,
      instructions,
    }), () => action('Change')(this.state))
  }

  onSubmit ({ daysToAddInExpirationDate, instructions }, errors) {
    if (!errors) {
      this.setState({
        actionsDisabled: true,
        daysToAddInExpirationDate,
        instructions,
      }, () => action('Submit')(this.state))
    }
  }

  render () {
    const {
      actionsDisabled,
      daysToAddInExpirationDate,
      instructions,
    } = this.state

    return (
      <BoletoConfigurationForm
        actionsDisabled={actionsDisabled}
        daysToAddInExpirationDate={daysToAddInExpirationDate}
        instructions={instructions}
        instructionsOptions={[
          {
            name: 'settings.boleto.instructions.accept',
            value: 'accept',
          },
          {
            name: 'settings.boleto.instructions.refuse',
            value: 'refuse',
          },
        ]}
        onCancel={this.onCancel}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        t={translate => translate}
      />
    )
  }
}

export default BoletoForm
