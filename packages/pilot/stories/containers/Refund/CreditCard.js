import React from 'react'
import {
  always,
  cond,
  equals,
  merge,
} from 'ramda'

import TransactionRefund from '../../../src/containers/Refund'

const getNextStep = cond([
  [equals('identification'), always('confirmation')],
  [equals('confirmation'), always('result')],
])

const getPreviousStep = cond([
  [equals('confirmation'), always('identification')],
  [equals('result'), always('confirmation')],
])

class TransactionRefundCardState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentStep: 'identification',
      isOpen: true,
      statusMessage: '',
      stepsStatus: {
        confirmation: 'pending',
        identification: 'current',
        result: 'pending',
      },
    }

    this.handleOnCancel = this.handleOnCancel.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleOnConfirm = this.handleOnConfirm.bind(this)
    this.handleStepBackward = this.handleStepBackward.bind(this)
    this.handleStepForward = this.handleStepForward.bind(this)
  }

  handleOnCancel () {
    const { currentStep } = this.state
    if (currentStep !== 'identification') {
      this.handleStepBackward()
    }
  }

  handleOnClose () {
    this.setState({ isOpen: false })
  }

  handleOnConfirm () {
    const { currentStep } = this.state
    if (currentStep === 'confirmation') {
      this.setState({ statusMessage: 'Estornado com sucesso' })
    }
    if (currentStep !== 'result') {
      this.handleStepForward()
    }
  }

  handleStepBackward () {
    const {
      currentStep,
      stepsStatus,
    } = this.state

    const previousStep = getPreviousStep(currentStep)

    this.setState({
      currentStep: previousStep,
      stepsStatus: merge(
        stepsStatus,
        {
          [currentStep]: 'pending',
          [previousStep]: 'current',
        }
      ),
    })
  }

  handleStepForward () {
    const {
      currentStep,
      stepsStatus,
    } = this.state

    const nextStep = getNextStep(currentStep)

    this.setState({
      currentStep: nextStep,
      stepsStatus: merge(
        stepsStatus,
        {
          [currentStep]: 'success',
          [nextStep]: 'success',
        }
      ),
    })
  }

  render () {
    const {
      currentStep,
      isOpen,
      statusMessage,
      stepsStatus,
    } = this.state

    return (
      <TransactionRefund
        currentStep={currentStep}
        isOpen={isOpen}
        onBack={this.handleOnCancel}
        onClose={this.handleOnClose}
        onConfirm={this.handleOnConfirm}
        statusMessage={statusMessage}
        stepsStatus={stepsStatus}
        t={translate => translate}
        transaction={{
          card: {
            brand_name: 'master card',
            first_digits: '123456',
            holder_name: 'João Neves',
            last_digits: '1234',
          },
          customer: {
            email: 'joao@neves.com',
          },
          payment: {
            installments: 12,
            method: 'credit_card',
            paid_amount: 2000000,
          },
        }}
      />
    )
  }
}

export default TransactionRefundCardState
