import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  always,
  cond,
  either,
  equals,
  T,
} from 'ramda'
import {
  Modal,
  ModalContent,
  ModalSection,
  ModalTitle,
  Steps,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import Form from './Form'
import Result from './Result'

const formatStepStatus = cond([
  [either(equals('current'), equals('error')), always('current')],
  [equals('success'), always('success')],
  [T, always('pending')],
])

const validateOnRestart = ({ onRestart, stepStatus }, propName) => {
  if (
    propName === 'onRestart'
    && stepStatus.result === 'error'
    && !onRestart
  ) {
    throw new Error('The prop onRestart must be a function when stepStatus.result is equal to "error"')
  }
}

class Reprocess extends PureComponent {
  render () {
    const {
      isOpen,
      loading,
      onCancel,
      onConfirm,
      onCopyId,
      onRestart,
      onViewTransaction,
      statusMessage,
      stepStatus,
      t,
      transaction: {
        amount,
        card: {
          first_digits, // eslint-disable-line camelcase
          holder_name, // eslint-disable-line camelcase
          last_digits, // eslint-disable-line camelcase
        },
        payment: {
          installments,
        },
      },
    } = this.props

    return (
      <Modal
        isOpen={isOpen}
        loading={loading}
        onRequestClose={onCancel}
      >
        <ModalTitle
          closeIcon={<IconClose height={16} width={16} />}
          onClose={onCancel}
          title={t('pages.reprocess.title')}
        />
        <ModalContent>
          <ModalSection>
            <Steps
              status={[
                {
                  id: 'confirmation',
                  status: formatStepStatus(stepStatus.confirmation),
                },
                {
                  id: 'result',
                  status: formatStepStatus(stepStatus.result),
                },
              ]}
              steps={[
                {
                  id: 'confirmation',
                  title: t('pages.reprocess.confirmation'),
                },
                {
                  id: 'result',
                  title: t('pages.reprocess.result'),
                },
              ]}
            />
          </ModalSection>
        </ModalContent>
        {stepStatus
          && stepStatus.result
          && stepStatus.result !== 'pending'
          ?
            <Result
              amount={amount}
              cardFirstDigits={first_digits} // eslint-disable-line camelcase
              cardLastDigits={last_digits} // eslint-disable-line camelcase
              holderName={holder_name} // eslint-disable-line camelcase
              installments={installments}
              onCopyIdClick={onCopyId}
              onRestart={onRestart}
              onViewTransactionClick={onViewTransaction}
              status={stepStatus.result}
              statusMessage={statusMessage}
              t={t}
            />
          :
            <Form
              amount={amount}
              cardFirstDigits={first_digits} // eslint-disable-line camelcase
              cardLastDigits={last_digits} // eslint-disable-line camelcase
              error={
                stepStatus.confirmation === 'error'
                ? statusMessage
                : ''
              }
              holderName={holder_name} // eslint-disable-line camelcase
              loading={loading}
              installments={installments}
              onCancel={onCancel}
              onConfirm={onConfirm}
              t={t}
            />
        }
      </Modal>
    )
  }
}

Reprocess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCopyId: PropTypes.func.isRequired,
  onRestart: validateOnRestart,
  onViewTransaction: PropTypes.func.isRequired,
  statusMessage: PropTypes.string,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.string,
    result: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    card: PropTypes.shape({
      first_digits: PropTypes.string.isRequired,
      holder_name: PropTypes.string.isRequired,
      last_digits: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    payment: PropTypes.shape({
      installments: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

Reprocess.defaultProps = {
  onRestart: null,
  statusMessage: '',
  stepStatus: {
    confirmation: 'current',
    result: null,
  },
}

export default Reprocess
