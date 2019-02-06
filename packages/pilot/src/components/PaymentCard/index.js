import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
} from 'former-kit'

import IconChip from './IconChip.svg'
import CardBrand from '../../formatters/cardBrand'
import cardNumberFormatter from '../../formatters/cardNumber'

import style from './style.css'

const PaymentCard = ({
  brand,
  first,
  holderName,
  last,
  title,
}) => (
  <Card className={style.card}>
    <CardContent className={style.cardContent}>
      <div className={style.cardTitle}>
        <h2>{title}</h2>
      </div>
      <div className={style.cardNumber}>
        <IconChip className={style.cardChip} />
        <strong>
          { cardNumberFormatter(first) } { last }
        </strong>
      </div>
      <div className={style.cardBrandHolder}>
        <p>{ holderName }</p>
        <span>{ CardBrand(brand) }</span>
      </div>
    </CardContent>
  </Card>
)

PaymentCard.propTypes = {
  brand: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  holderName: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PaymentCard

