import React, { Component } from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import {
  always,
  complement,
  cond,
  contains,
  equals,
} from 'ramda'
import Anticipation from '../../../src/containers/Anticipation'
import Section from '../../Section'

const dafaultStepsStatus = {
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

const isWeekendDay = date =>
  date && date.weekday && contains(date.weekday(), [0, 6])

const isWeekDay = complement(isWeekendDay)

class AnticipationExample extends Component {
  constructor () {
    super()

    this.state = {
      amount: 1269633,
      approximateRequested: 1270000,
      automaticTransfer: true,
      cost: 300,
      currentStep: 'data',
      date: moment('2018-07-06'),
      error: '',
      max: 2000000,
      min: 10000,
      recalculationNeeded: false,
      requested: 0,
      stepsStatus: dafaultStepsStatus,
      timeframe: 'end',
      transferCost: 67,
    }

    this.goTo = this.goTo.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this)
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

  handleCalculate ({
    date,
    isAutomaticTransfer,
    requested,
    timeframe,
  }) {
    const {
      cost,
      max,
      min,
      transferCost,
    } = this.state
    let approximateRequested = requested === max
      ? requested
      : requested - 100
    approximateRequested = approximateRequested < min
      ? requested
      : approximateRequested

    this.setState({
      amount: (approximateRequested - (cost + transferCost)),
      approximateRequested,
      automaticTransfer: isAutomaticTransfer,
      date,
      requested,
      timeframe,
    })

    action('calculate')({
      date,
      isAutomaticTransfer,
      requested,
      timeframe,
    })
  }

  handleChange () {
    action('change')()
    this.setState({
      recalculationNeeded: true,
    })
  }

  handleDateChange ({ start }) {
    this.setState({
      recalculationNeeded: true,
    })
    action('changed date')(start)
  }

  handleTimeframeChange (timeframe) {
    this.setState({
      recalculationNeeded: true,
      timeframe,
    })
    action('changed timeframe')(timeframe)
  }

  render () {
    const {
      amount,
      approximateRequested,
      automaticTransfer,
      cost,
      currentStep,
      date,
      error,
      max,
      min,
      recalculationNeeded,
      requested,
      stepsStatus,
      timeframe,
      transferCost,
    } = this.state

    return (
      <Section>
        <Anticipation
          amount={Number(amount)}
          approximateRequested={Number(approximateRequested)}
          automaticTransfer={automaticTransfer}
          currentStep={currentStep}
          date={date}
          error={error}
          loading={false}
          maximum={Number(max)}
          minimum={Number(min)}
          onCalculateSubmit={this.handleCalculate}
          onCancel={action('Cancel')}
          onConfirmationConfirm={() => this.goTo('result', 'success')}
          onConfirmationReturn={() => this.goTo('data')}
          onDataConfirm={() => this.goTo('confirmation')}
          onFormChange={this.handleChange}
          onTryAgain={action('Try again')}
          onViewStatement={action('See balance')}
          onViewAnticipation={action('See anticipation')}
          onDateChange={this.handleDateChange}
          onTimeframeChange={this.handleTimeframeChange}
          recalculationNeeded={recalculationNeeded}
          recipient={recipient}
          requested={Number(requested)}
          statusMessage="Success!!!!"
          stepsStatus={stepsStatus}
          t={t => t}
          timeframe={timeframe}
          totalCost={Number(cost)}
          transferCost={Number(transferCost)}
          validateDay={isWeekDay}
        />
      </Section>
    )
  }
}

export default AnticipationExample
