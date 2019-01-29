import React, { Component } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import {
  always,
  cond,
  equals,
  last,
  pipe,
  split,
} from 'ramda'
import Withdraw from '../../../src/containers/Withdraw'
import Section from '../../Section'

const stepsStatus = {
  confirmation: 'pending',
  data: 'current',
  result: 'pending',
}

const recipient = {
  bank_account: {
    agencia: '0932',
    agencia_dv: '5',
    bank_code: '341',
    charge_transfer_fees: true,
    conta: '58054',
    conta_dv: '1',
    date_created: '2017-01-06T18:52:22.215Z',
    document_number: '26268738888',
    document_type: 'cpf',
    id: 17365090,
    legal_name: 'API BANK ACCOUNT',
    object: 'bank_account',
    type: 'conta_corrente',
  },
  date_created: '2017-01-06T18:59:35.936Z',
  id: 're_cixm61j7e00doin6de8ocgttb',
  last_transfer: null,
  object: 'recipient',
  transfer_enabled: true,
}

const transferCost = -3214

class WithdrawExample extends Component {
  constructor () {
    super()

    this.state = {
      currentStep: 'data',
      error: '',
      requested: '0',
      stepsStatus,
    }

    this.goTo = this.goTo.bind(this)
    this.handleRequestChange = this.handleRequestChange.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
  }

  handleRequestChange (requested) {
    this.setState({ requested })
  }

  goTo (nextStep, nextStepStatus = 'current') {
    const buildStepsStatus = cond([
      [
        equals('data'),
        always({
          confirmation: 'pending',
          data: nextStepStatus,
          result: 'pending',
        }),
      ],
      [
        equals('confirmation'),
        always({
          confirmation: nextStepStatus,
          data: 'success',
          result: 'pending',
        }),
      ],
      [
        equals('result'),
        always({
          confirmation: 'success',
          data: 'success',
          result: nextStepStatus,
        }),
      ],
    ])

    this.setState({
      currentStep: nextStep,
      stepsStatus: buildStepsStatus(nextStep),
    })
  }

  handleConfirmation (password) {
    if (password === 'aaa') {
      this.setState({
        error: 'Senha errada',
      })
    } else {
      this.setState({
        error: '',
      })

      const status = password === '123'
        ? 'error'
        : 'success'

      this.goTo('result', status)
    }
  }

  render () {
    return (
      <Section>
        <Withdraw
          amount={Number(this.state.requested) + transferCost}
          available={123456}
          confirmationPasswordError={this.state.error}
          currentStep={this.state.currentStep}
          date={moment()}
          disabled={false}
          maximum={12345}
          onConfirmationConfirm={this.handleConfirmation}
          onConfirmationReturn={() => this.goTo('data')}
          onFormSubmit={() => this.goTo('confirmation')}
          onRequestedChange={this.handleRequestChange}
          onTryAgain={() => this.toTo('data', 'current')}
          onViewStatement={action('See statement')}
          recipient={recipient}
          requested={Number(this.state.requested)}
          statusMessage="Success!!!!"
          stepsStatus={this.state.stepsStatus}
          t={pipe(split('.'), last)}
          transferCost={transferCost}
        />
      </Section>
    )
  }
}

export default WithdrawExample
