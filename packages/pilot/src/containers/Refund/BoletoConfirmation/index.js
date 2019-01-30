import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  ModalActions,
} from 'former-kit'

import BoletoRefundDetails from '../../../components/BoletoRefundDetails'

class BoletoConfirmation extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onConfirm()
  }

  render () {
    const {
      amount,
      bankAccount: {
        agencia,
        agencia_dv: agencyVd,
        bank_code: bankCode,
        conta,
        conta_dv: accountVd,
        document_number: documentNumber,
        legal_name: legalName,
        type,
      },
      disabled,
      onBack,
      refundAmount,
      t,
    } = this.props

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
      accountVd,
      agency: agencia,
      agencyVd,
      amount,
      bank: t(`models.bank_code.${bankCode}`), // eslint-disable-line camelcase
      documentNumber,
      legalName,
      refundAmount,
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <BoletoRefundDetails
          contents={contents}
          labels={labels}
          title={t('pages.refund.refund_data')}
        />
        <ModalActions>
          <Button
            disabled={disabled}
            fill="outline"
            onClick={onBack}
            type="button"
          >
            {t('pages.refund.go_back')}
          </Button>
          <Button
            disabled={disabled}
            type="submit"
          >
            {t('pages.refund.confirm')}
          </Button>
        </ModalActions>
      </form>
    )
  }
}

BoletoConfirmation.propTypes = {
  amount: PropTypes.number.isRequired,
  bankAccount: PropTypes.shape({
    agencia: PropTypes.string.isRequired,
    agencia_dv: PropTypes.string,
    bank_code: PropTypes.string.isRequired,
    conta: PropTypes.string.isRequired,
    conta_dv: PropTypes.string.isRequired,
    document_number: PropTypes.string.isRequired,
    legal_name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  refundAmount: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

BoletoConfirmation.defaultProps = {
  disabled: false,
}

export default BoletoConfirmation
