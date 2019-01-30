import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconChecked from 'emblematic-icons/svg/Check32.svg'
import IconError from 'emblematic-icons/svg/ClearClose32.svg'

import {
  always,
  cond,
  equals,
} from 'ramda'
import {
  Alert,
  Button,
  ModalActions,
  ModalContent,
} from 'former-kit'

import BoletoRefundDetails from '../../../components/BoletoRefundDetails'

const getIcon = cond([
  [equals('success'), always(<IconChecked height={16} width={16} />)],
  [equals('error'), always(<IconError height={16} width={16} />)],
])

const BoletoResult = ({
  amount,
  bankAccount: {
    agencia,
    agencia_dv, // eslint-disable-line camelcase
    bank_code, // eslint-disable-line camelcase
    conta,
    conta_dv, // eslint-disable-line camelcase
    document_number, // eslint-disable-line camelcase
    legal_name, // eslint-disable-line camelcase
    type,
  },
  onTryAgain,
  onViewTransaction,
  refundAmount,
  status,
  statusMessage,
  t,
}) => {
  const labels = {
    account: t('models.bank_account.account'),
    accountType: t('models.bank_account.account_type'),
    agency: t('models.bank_account.agency'),
    amount: t('models.transaction.amount'),
    bank: t('models.bank_account.bank'),
    documentNumber: t('models.bank_account.document'),
    legalName: t('models.bank_account.legal_name'),
    refundAmount: t('pages.refund.refund_amount'),
  }

  const contents = {
    account: conta,
    accountType: t(`models.account_type.${type}`),
    accountVd: conta_dv,
    agency: agencia,
    agencyVd: agencia_dv,
    amount,
    bank: t(`models.bank_code.${bank_code}`), // eslint-disable-line camelcase
    documentNumber: document_number,
    legalName: legal_name,
    refundAmount,
  }
  return (
    <Fragment>
      <ModalContent>
        <Alert
          icon={getIcon(status)}
          type={status}
        >
          <span>{statusMessage}</span>
        </Alert>
      </ModalContent>
      {status === 'success' &&
        (
          <BoletoRefundDetails
            contents={contents}
            labels={labels}
            title={t('pages.refund.refund_data')}
          />
        )
      }
      <ModalActions>
        {status === 'success'
          ? (
            <Button
              fill="outline"
              onClick={onViewTransaction}
            >
              {t('pages.refund.view_transaction')}
            </Button>
          )
          : (
            <Button
              fill="outline"
              onClick={onTryAgain}
            >
              {t('pages.refund.try_again')}
            </Button>
          )
        }
      </ModalActions>
    </Fragment>
  )
}

BoletoResult.propTypes = {
  amount: PropTypes.number.isRequired,
  bankAccount: PropTypes.shape({
    agencia: PropTypes.string.isRequired,
    agencia_dv: PropTypes.string.isRequired,
    bank_code: PropTypes.string.isRequired,
    conta: PropTypes.string.isRequired,
    conta_dv: PropTypes.string.isRequired,
    document_number: PropTypes.string.isRequired,
    legal_name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  refundAmount: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'error',
    'success',
  ]).isRequired,
  statusMessage: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default BoletoResult
