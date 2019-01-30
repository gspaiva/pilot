import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalContent,
  ModalSection,
  ModalTitle,
  Steps,
} from 'former-kit'
import {
  assoc,
  applySpec,
  identity,
  ifElse,
  map,
  path,
  pathOr,
  pipe,
  propEq,
  toPairs,
} from 'ramda'

import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import CardForm from './CardForm'
import CardConfirmation from './CardConfirmation'
import CardResult from './CardResult'
import BoletoForm from './BoletoForm'
import BoletoConfirmation from './BoletoConfirmation'
import BoletoResult from './BoletoResult'

const identification = 'identification'
const confirmation = 'confirmation'
const result = 'result'

const createStepsStatus = pipe(
  toPairs,
  map(item => ({
    id: item[0],
    status: item[1],
  }))
)

const setCurrentStep = currentStep => ifElse(
  propEq('id', currentStep),
  assoc('status', 'current'),
  identity
)

const getCustomerEmail = path(['transaction', 'customer', 'email'])
const getDataAmount = pathOr('', ['data', 'amount'])
const getBoletoIdentificationData = applySpec({
  bankAccount: {
    agencia: pathOr('', ['data', 'bank_account', 'agencia']),
    agencia_dv: pathOr('', ['data', 'bank_account', 'agencia_dv']),
    bank_code: pathOr('', ['data', 'bank_account', 'bank_code']),
    conta: pathOr('', ['data', 'bank_account', 'conta']),
    conta_dv: pathOr('', ['data', 'bank_account', 'conta_dv']),
    document_number: pathOr('', ['data', 'bank_account', 'document_number']),
    legal_name: pathOr('', ['data', 'bank_account', 'legal_name']),
    type: pathOr('', ['data', 'bank_account', 'type']),
  },
  refundAmount: getDataAmount,
})

class TransactionRefund extends Component {
  constructor (props) {
    super(props)

    this.getStepsStatus = this.getStepsStatus.bind(this)
    this.handleConfirmConfirmation = this.handleConfirmConfirmation.bind(this)
    this.handleConfirmIndentification =
      this.handleConfirmIndentification.bind(this)
    this.renderBoleto = this.renderBoleto.bind(this)
    this.renderBoletoConfirmation = this.renderBoletoConfirmation.bind(this)
    this.renderBoletoIdentification = this.renderBoletoIdentification.bind(this)
    this.renderBoletoResult = this.renderBoletoResult.bind(this)
    this.renderCardConfirmation = this.renderCardConfirmation.bind(this)
    this.renderCardIdentification = this.renderCardIdentification.bind(this)
    this.renderCardResult = this.renderCardResult.bind(this)
    this.renderCreditCard = this.renderCreditCard.bind(this)
    this.renderCurrentStep = this.renderCurrentStep.bind(this)
  }

  getStepsStatus () {
    const { currentStep, stepsStatus } = this.props
    const steps = createStepsStatus(stepsStatus)

    return map(setCurrentStep(currentStep), steps)
  }

  handleConfirmIndentification (data) {
    this.setState({ data })
    this.props.onConfirm()
  }

  handleConfirmConfirmation () {
    const { data } = this.state
    this.props.onConfirm(data)
  }

  /* eslint-disable camelcase */
  renderBoletoIdentification () {
    const {
      t,
      transaction: {
        payment: {
          paid_amount,
        },
      },
    } = this.props

    const data = getBoletoIdentificationData(this.state)

    return (
      <BoletoForm
        {...data}
        amount={paid_amount}
        onSubmit={this.handleConfirmIndentification}
        t={t}
      />
    )
  }

  renderBoletoConfirmation () {
    const {
      data: {
        amount,
        bank_account: {
          agencia,
          agencia_dv,
          bank_code,
          conta,
          conta_dv,
          document_number,
          legal_name,
          type,
        },
      },
    } = this.state

    const {
      loading,
      onBack,
      statusMessage,
      t,
      transaction: {
        payment: {
          paid_amount,
        },
      },
    } = this.props

    return (
      <BoletoConfirmation
        amount={paid_amount}
        bankAccount={{
          agencia,
          agencia_dv,
          bank_code,
          conta,
          conta_dv,
          document_number,
          legal_name,
          type,
        }}
        disabled={loading}
        errorMessage={statusMessage}
        onBack={onBack}
        onConfirm={this.handleConfirmConfirmation}
        refundAmount={amount}
        t={t}
      />
    )
  }

  renderBoletoResult () {
    const {
      data: {
        amount,
        bank_account: {
          agencia,
          agencia_dv,
          bank_code,
          conta,
          conta_dv,
          document_number,
          legal_name,
          type,
        },
      },
    } = this.state

    const {
      onBack,
      onConfirm,
      statusMessage,
      stepsStatus,
      t,
      transaction: {
        payment: {
          paid_amount,
        },
      },
    } = this.props

    return (
      <BoletoResult
        amount={paid_amount}
        bankAccount={{
          agencia,
          agencia_dv,
          bank_code,
          conta,
          conta_dv,
          document_number,
          legal_name,
          type,
        }}
        onTryAgain={onBack}
        onViewTransaction={onConfirm}
        status={stepsStatus.result}
        statusMessage={statusMessage}
        refundAmount={amount}
        t={t}
      />
    )
  }

  renderCardIdentification () {
    const {
      t,
      transaction: {
        card: {
          brand_name,
          first_digits,
          holder_name,
          last_digits,
        },
        payment: {
          installments,
          paid_amount,
        },
      },
    } = this.props

    const refundAmount = getDataAmount(this.state)

    return (
      <CardForm
        amount={paid_amount}
        brand={brand_name}
        cardFirstDigits={first_digits}
        cardLastDigits={last_digits}
        email={getCustomerEmail(this.props)}
        holderName={holder_name}
        installments={installments}
        onConfirm={this.handleConfirmIndentification}
        refundAmount={refundAmount}
        t={t}
      />
    )
  }

  renderCardConfirmation () {
    const {
      loading,
      onBack,
      statusMessage,
      t,
      transaction: {
        card: {
          brand_name,
          first_digits,
          holder_name,
          last_digits,
        },
        payment: {
          installments,
          paid_amount,
        },
      },
    } = this.props
    const {
      data: {
        amount,
      },
    } = this.state

    return (
      <CardConfirmation
        amount={paid_amount}
        brand={brand_name}
        cardFirstDigits={first_digits}
        cardLastDigits={last_digits}
        disabled={loading}
        email={getCustomerEmail(this.props)}
        errorMessage={statusMessage}
        holderName={holder_name}
        installments={installments}
        onBack={onBack}
        onConfirm={this.handleConfirmConfirmation}
        refundAmount={amount}
        t={t}
      />
    )
  }

  renderCardResult () {
    const {
      onBack,
      onConfirm,
      statusMessage,
      stepsStatus,
      t,
      transaction: {
        card: {
          brand_name,
          first_digits,
          holder_name,
          last_digits,
        },
        payment: {
          installments,
          paid_amount,
        },
      },
    } = this.props
    const {
      data: {
        amount,
      },
    } = this.state

    return (
      <CardResult
        amount={paid_amount}
        brand={brand_name}
        cardFirstDigits={first_digits}
        cardLastDigits={last_digits}
        email={getCustomerEmail(this.props)}
        holderName={holder_name}
        installments={installments}
        onTryAgain={onBack}
        onViewTransaction={onConfirm}
        status={stepsStatus.result}
        statusMessage={statusMessage}
        refundAmount={amount}
        t={t}
      />
    )
  }

  renderCurrentStep () {
    const {
      transaction: {
        payment: {
          method,
        },
      },
    } = this.props

    switch (method) { // eslint-disable-line default-case
      case 'boleto': {
        return this.renderBoleto()
      }
      case 'credit_card': {
        return this.renderCreditCard()
      }
      default: {
        return null
      }
    }
  }
  /* eslint-enable camelcase */

  renderBoleto () {
    const { currentStep } = this.props
    switch (currentStep) {
      case identification: {
        return this.renderBoletoIdentification()
      }
      case confirmation: {
        return this.renderBoletoConfirmation()
      }
      case result: {
        return this.renderBoletoResult()
      }
      default: {
        return null
      }
    }
  }

  renderCreditCard () {
    const { currentStep } = this.props
    switch (currentStep) { // eslint-disable-line default-case
      case identification: {
        return this.renderCardIdentification()
      }
      case confirmation: {
        return this.renderCardConfirmation()
      }
      case result: {
        return this.renderCardResult()
      }
      default: {
        return null
      }
    }
  }

  render () {
    const {
      isOpen,
      onClose,
      t,
    } = this.props
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <ModalTitle
          closeIcon={<IconClose height={16} width={16} />}
          onClose={onClose}
          title={t('pages.refund.transaction_refund')}
        />
        <ModalContent>
          <ModalSection>
            <Steps
              status={this.getStepsStatus()}
              steps={[
                { id: identification, title: t('pages.refund.identification') },
                { id: confirmation, title: t('pages.refund.confirmation') },
                { id: result, title: t('pages.refund.conclusion') },
              ]}
            />
          </ModalSection>
        </ModalContent>
        {this.renderCurrentStep()}
      </Modal>
    )
  }
}

TransactionRefund.propTypes = {
  currentStep: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  statusMessage: PropTypes.string,
  stepsStatus: PropTypes.shape({
    confirmation: PropTypes.string.isRequired,
    identification: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    card: PropTypes.shape({
      brand_name: PropTypes.string,
      first_digits: PropTypes.string,
      holder_name: PropTypes.string,
      last_digits: PropTypes.string,
    }),
    customer: PropTypes.shape({
      email: PropTypes.string,
    }),
    payment: PropTypes.shape({
      installments: PropTypes.number,
      method: PropTypes.string,
      paid_amount: PropTypes.number,
    }),
  }).isRequired,
}

TransactionRefund.defaultProps = {
  loading: false,
  onBack: null,
  statusMessage: '',
}
export default TransactionRefund
