import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  append,
  complement,
  contains,
  equals,
  filter,
  ifElse,
  uncurryN,
} from 'ramda'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

import RecipientSection from '../../components/RecipientSection'
import style from './style.css'

const notContains = complement(contains)
const notEqual = complement(equals)

const toggleListItem = uncurryN(2, item => ifElse(
  contains(item),
  filter(notEqual(item)),
  append(item)
))

class RecipientList extends Component {
  constructor () {
    super()

    this.state = {
      expandedItems: [],
    }
    this.handleItemExpand = this.handleItemExpand.bind(this)
    this.renderRecipientList = this.renderRecipientList.bind(this)
    this.renderRecipientsTitle = this.renderRecipientsTitle.bind(this)
    this.renderSingleRecipientTitle = this.renderSingleRecipientTitle.bind(this)
  }

  handleItemExpand (itemIndex) {
    const { expandedItems } = this.state
    this.setState({
      expandedItems: toggleListItem(itemIndex, expandedItems),
    })
  }

  renderRecipientList () {
    const {
      collapseInstallmentTitle,
      expandAllRecipients,
      expandInstallmentTitle,
      installmentTotalLabel,
      installmentsTableColumns,
      liabilitiesLabel,
      netAmountLabel,
      outAmountLabel,
      recipients,
      statusLabel,
    } = this.props

    return recipients.map((recipient, index) => {
      const {
        amount,
        installments,
        liabilities,
        name,
        net_amount, // eslint-disable-line camelcase
        status,
      } = recipient
      const collapsed = notContains(index, this.state.expandedItems)
        && !expandAllRecipients

      const key = `recipient_${index}`
      return (
        <RecipientSection
          isSingleRecipient={recipients.length === 1}
          className={style.recipient}
          collapsed={collapsed}
          collapsedTitle={collapseInstallmentTitle}
          columns={installmentsTableColumns}
          installments={installments}
          key={key}
          liabilities={liabilities}
          liabilitiesLabel={liabilitiesLabel}
          name={name}
          netAmount={net_amount} // eslint-disable-line camelcase
          netAmountLabel={netAmountLabel}
          onDetailsClick={() => this.handleItemExpand(index)}
          outAmountLabel={outAmountLabel}
          status={status}
          statusLabel={statusLabel}
          title={expandInstallmentTitle}
          totalAmount={amount}
          totalLabel={installmentTotalLabel}
        />
      )
    })
  }

  renderRecipientsTitle () {
    const {
      title,
      total,
      totalRecipientsLabel,
      totalTitle,
    } = this.props
    return (
      <div className={style.recipientList}>
        <CardTitle
          className={style.titleContainer}
          title={title}
          subtitle={<span className={style.subtitle}>{totalTitle}</span>}
        />
        <CardContent>
          <div className={style.totals}>
            <span className={style.recipientsLabel}>
              {totalRecipientsLabel}
            </span>
            <span className={style.total}> {total} </span>
          </div>
        </CardContent>
        <CardContent>
          <div className={style.recipients}>
            {this.renderRecipientList()}
          </div>
        </CardContent>
      </div>
    )
  }

  renderSingleRecipientTitle () {
    const {
      title,
    } = this.props
    return (
      <Fragment>
        <CardTitle
          title={title}
        />
        <CardContent>
          {this.renderRecipientList()}
        </CardContent>
      </Fragment>
    )
  }

  render () {
    const {
      recipients,
    } = this.props

    const totalRecipients = recipients
      ? recipients.length
      : 0
    return (
      <Card>
        {totalRecipients === 1
          ? this.renderSingleRecipientTitle()
          : this.renderRecipientsTitle()
        }
      </Card>
    )
  }
}

RecipientList.propTypes = {
  collapseInstallmentTitle: PropTypes.string,
  expandAllRecipients: PropTypes.bool,
  expandInstallmentTitle: PropTypes.string,
  installmentsTableColumns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
  installmentTotalLabel: PropTypes.string, // eslint-disable-line react/sort-prop-types
  liabilitiesLabel: PropTypes.string,
  netAmountLabel: PropTypes.string,
  outAmountLabel: PropTypes.string,
  recipients: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    installments: PropTypes.arrayOf(PropTypes.shape({
      costs: PropTypes.shape({
        anticipation: PropTypes.number,
        chargeback: PropTypes.number,
        mdr: PropTypes.number,
        refund: PropTypes.number,
      }),
      net_amount: PropTypes.number,
      number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      original_payment_date: PropTypes.instanceOf(moment),
      payment_date: PropTypes.instanceOf(moment),
      status: PropTypes.string,
    })).isRequired,
    liabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    net_amount: PropTypes.number.isRequired, // eslint-disable-line camelcase
    status: PropTypes.string,
  })).isRequired,
  statusLabel: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.string.isRequired,
  totalRecipientsLabel: PropTypes.string,
  totalTitle: PropTypes.string,
}

RecipientList.defaultProps = {
  collapseInstallmentTitle: '',
  expandAllRecipients: false,
  expandInstallmentTitle: '',
  installmentTotalLabel: '',
  liabilitiesLabel: '',
  netAmountLabel: '',
  outAmountLabel: '',
  statusLabel: '',
  title: '',
  totalRecipientsLabel: '',
  totalTitle: '',
}

export default RecipientList
