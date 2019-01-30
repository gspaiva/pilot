import React from 'react'
import {
  path,
  pick,
  pipe,
  prop,
} from 'ramda'

import { Button } from 'former-kit'

import formatCpfCnpj from '../../formatters/cpfCnpj'
import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import formatPaymentMethod from '../../formatters/paymentMethod'
import formatRefuseReason from '../../formatters/refuseReason'
import renderCardBrand from '../../containers/TransactionsList/renderCardBrand'
import renderStatusLegend from '../../containers/TransactionsList/renderStatusLegend'

const convertPaymentValue = property => pipe(
  path(['payment', property]),
  formatCurrency
)

const getDefaultColumns = ({ onDetailsClick, t }) => ([
  {
    accessor: ['status'],
    orderable: true,
    renderer: renderStatusLegend,
    title: t('models.transaction.status'),
  },
  {
    accessor: ['id'],
    orderable: true,
    title: t('models.transaction.id'),
  },
  {
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDate),
    title: t('models.transaction.created_date'),
  },
  {
    accessor: ['customer', 'document_number'],
    renderer: pipe(
      path(['customer', 'document_number']),
      formatCpfCnpj
    ),
    title: t('models.transaction.document'),
  },
  {
    accessor: ['payment', 'method'],
    orderable: true,
    renderer: pipe(
      prop('payment'),
      pick(['method', 'international']),
      formatPaymentMethod,
      t
    ),
    title: t('models.transaction.payment_method'),
  },
  {
    accessor: ['payment', 'paid_amount'],
    orderable: true,
    renderer: convertPaymentValue('paid_amount'),
    title: t('models.transaction.paid_amount'),
  },
  {
    accessor: ['customer', 'email'],
    orderable: true,
    title: t('models.transaction.email'),
  },
  {
    accessor: ['refuse_reason'],
    orderable: true,
    renderer: pipe(
      prop('refuse_reason'),
      formatRefuseReason
    ),
    title: t('models.transaction.refuse_reason'),
  },
  {
    accessor: ['payment', 'installments'],
    orderable: true,
    title: t('models.transaction.installments'),
  },
  {
    accessor: ['customer', 'name'],
    orderable: true,
    title: t('models.transaction.customer_name'),
  },
  {
    accessor: ['card', 'brand_name'],
    orderable: true,
    renderer: renderCardBrand,
    title: t('models.transaction.card_brand'),
  },
  {
    accessor: ['boleto', 'url'],
    orderable: true,
    title: t('models.transaction.boleto_url'),
  },
  {
    aggregationRenderer: null,
    aggregationTitle: null,
    aggregator: null,
    align: 'center',
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => onDetailsClick(index)}
      >
        {t('pages.transaction.view_details')}
      </Button>
    ),
    title: t('models.transaction.details'),
  },
])

export default getDefaultColumns
