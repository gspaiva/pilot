import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import {
  last,
  pipe,
  split,
} from 'ramda'
import WithdrawForm from '../../../../src/containers/Withdraw/Form'
import Section from '../../../Section'

const transferCost = -324

class WithdrawFormState extends Component {
  constructor () {
    super()

    this.state = {
      requested: '0',
    }

    this.handleRequestChange = this.handleRequestChange.bind(this)
  }

  handleRequestChange (requested) {
    this.setState({
      requested,
    })
  }

  render () {
    return (
      <Section>
        <WithdrawForm
          amount={Number(this.state.requested) + transferCost}
          available={123456}
          date={new Date()}
          maximum={12345}
          onRequestedChange={this.handleRequestChange}
          onSubmit={action('Submit')}
          requested={Number(this.state.requested)}
          t={pipe(split('.'), last)}
          transferCost={transferCost}
        />
      </Section>
    )
  }
}

export default WithdrawFormState
