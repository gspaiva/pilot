import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  ModalContent,
  ModalTitle,
  Col,
  Grid,
  Row,
} from 'former-kit'

import { mapObjIndexed } from 'ramda'

import formatAgencyAccount from '../../formatters/agencyAccount'
import formatCpfCnpj from '../../formatters/cpfCnpj'
import formatCurrency from '../../formatters/currency'
import Property from '../Property'
import style from './style.css'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    title={label}
    value={contents[key]}
  />
), labels)

const BoletoRefundDetails = ({ contents, labels, title }) => {
  const {
    account,
    accountType,
    accountVd,
    agency,
    agencyVd,
    amount,
    bank,
    documentNumber,
    legalName,
    refundAmount,
  } = contents

  const formattedContent = {
    account: formatAgencyAccount(account, accountVd),
    accountType,
    agency: formatAgencyAccount(agency, agencyVd),
    amount: formatCurrency(amount),
    bank,
    documentNumber: formatCpfCnpj(documentNumber),
    legalName,
  }
  const data = fields(labels, formattedContent)

  return (
    <Fragment>
      <ModalTitle
        title={title}
        titleAlign="start"
      />
      <ModalContent>
        <Grid>
          <Row>
            <Col palm={12} tablet={6} desk={6} tv={6}>
              {data.bank}
            </Col>

            <Col palm={12} tablet={6} desk={6} tv={6}>
              {data.accountType}
            </Col>

            <Col palm={12} tablet={6} desk={2} tv={2}>
              {data.agency}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {data.account}
            </Col>

            <Col palm={12} tablet={6} desk={6} tv={6}>
              {data.documentNumber}
            </Col>

            <Col palm={12} tablet={12} desk={12} tv={12}>
              {data.legalName}
            </Col>

            <Col palm={12} tablet={6} desk={6} tv={6}>
              {data.amount}
            </Col>
            <Col palm={12} tablet={6} desk={6} tv={6}>
              <Property
                title={labels.refundAmount}
                value={
                  <span className={style.refundAmount}>
                    {formatCurrency(refundAmount)}
                  </span>
                }
              />
            </Col>
          </Row>
        </Grid>
      </ModalContent>
    </Fragment>
  )
}

BoletoRefundDetails.propTypes = {
  contents: PropTypes.shape({
    account: PropTypes.string.isRequired,
    accountType: PropTypes.string.isRequired,
    accountVd: PropTypes.string,
    agency: PropTypes.string.isRequired,
    agencyVd: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    bank: PropTypes.string.isRequired,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    refundAmount: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    account: PropTypes.string.isRequired,
    accountType: PropTypes.string.isRequired,
    agency: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    bank: PropTypes.string.isRequired,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    refundAmount: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default BoletoRefundDetails
