import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  complement,
  contains,
  last,
  pipe,
  split,
} from 'ramda'
import AnticipationForm from '../../../../src/containers/Anticipation/Form'
import Section from '../../../Section'

const defaultState = {
  amount: 1269633,
  approximateRequested: 1270000,
  cost: 300,
  date: moment('2018-07-06'),
  max: 2000000,
  min: 10000,
  recalculationNeeded: false,
  requested: 0,
  timeframe: 'end',
  transferCost: 67,
}

const isWeekendDay = date =>
  date && date.weekday && contains(date.weekday(), [0, 6])

const isWeekDay = complement(isWeekendDay)

class AnticipationFormState extends Component {
  constructor () {
    super()

    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this)

    this.state = defaultState
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
      date,
      isAutomaticTransfer,
      recalculationNeeded: false,
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

  handleCancel () {
    action('cancel')()
    this.setState(defaultState)
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
      cost,
      date,
      isAutomaticTransfer,
      max,
      min,
      recalculationNeeded,
      requested,
      timeframe,
      transferCost,
    } = this.state

    return (
      <Section>
        <AnticipationForm
          amount={amount}
          approximateRequested={approximateRequested}
          cost={cost}
          date={date}
          isAutomaticTransfer={isAutomaticTransfer}
          isValidDay={isWeekDay}
          loading={false}
          maximum={max}
          minimum={min}
          onCalculateSubmit={this.handleCalculate}
          onCancel={this.handleCancel}
          onChange={this.handleChange}
          onConfirm={action('confirm')}
          onDateChange={this.handleDateChange}
          onTimeframeChange={this.handleTimeframeChange}
          recalculationNeeded={recalculationNeeded}
          requested={Number(requested)}
          t={pipe(split('.'), last)}
          timeframe={timeframe}
          transferCost={transferCost}
        />
      </Section>
    )
  }
}

export default AnticipationFormState
