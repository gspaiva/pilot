import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { isEmpty } from 'ramda'
import {
  Card,
  CardSection,
  CardSectionTitle,
  Table,
} from 'former-kit'
import { matchToPrint } from '../../validation/matchToMediaQuery'
import RecipientCard from '../RecipientCard'
import style from './style.css'

class RecipientSection extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
    }
    this.renderInstallmentsTable = this.renderInstallmentsTable.bind(this)
    this.renderInstallments = this.renderInstallments.bind(this)
    this.renderSingleRecipientInstallments =
      this.renderSingleRecipientInstallments.bind(this)
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  renderInstallmentsTable (isPrint) {
    const {
      collapsed,
      columns,
      installments,
    } = this.props
    const isMultipleInstallments = installments.length >= 1

    if (!collapsed || !isMultipleInstallments || isPrint) {
      return (
        <Table
          columns={columns}
          rows={installments}
          showAggregationRow={isMultipleInstallments}
        />
      )
    }
    return null
  }

  renderInstallments () {
    const {
      collapsed,
      collapsedTitle,
      installments,
      liabilities,
      liabilitiesLabel,
      name,
      netAmount,
      netAmountLabel,
      onDetailsClick,
      outAmountLabel,
      status,
      statusLabel,
      title,
      totalAmount,
      totalLabel,
    } = this.props
    const isPrint = matchToPrint()
    const hasInstallments = !isEmpty(installments)

    return (
      <Fragment>
        <RecipientCard
          liabilities={liabilities}
          liabilitiesLabel={liabilitiesLabel}
          name={name}
          netAmount={netAmount}
          netAmountLabel={netAmountLabel}
          outAmountLabel={outAmountLabel}
          status={status}
          statusLabel={statusLabel}
          totalAmount={totalAmount}
          totalLabel={totalLabel}
        />
        {hasInstallments && !isPrint &&
          <CardSection>
            {this.renderInstallmentsTable()}
            <CardSectionTitle
              collapsed={collapsed}
              title={
                collapsed
                  ? collapsedTitle
                  : title
              }
              onClick={onDetailsClick}
            />
          </CardSection>
        }
        {hasInstallments && isPrint &&
          <CardSection>
            {this.renderInstallmentsTable(isPrint)}
          </CardSection>
        }
      </Fragment>
    )
  }

  renderSingleRecipientInstallments () {
    return (
      <CardSection>
        {this.renderInstallmentsTable()}
      </CardSection>
    )
  }

  render () {
    const {
      className,
    } = this.props
    const { hasError } = this.state

    return (
      <Card className={classNames(
          style.recipientSection,
          className
        )}
      >
        {!hasError
          && this.renderInstallments()
        }
        {hasError &&
          <CardSection>
            <p> Deu um erro, beleza ? </p>
          </CardSection>
        }
      </Card>
    )
  }
}

RecipientSection.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedTitle: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
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
  liabilitiesLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  netAmountLabel: PropTypes.string,
  onDetailsClick: PropTypes.func.isRequired,
  outAmountLabel: PropTypes.string,
  status: PropTypes.string,
  statusLabel: PropTypes.string,
  title: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  totalLabel: PropTypes.string,
}

RecipientSection.defaultProps = {
  className: '',
  collapsed: true,
  collapsedTitle: '',
  liabilitiesLabel: '',
  netAmountLabel: '',
  outAmountLabel: '',
  status: '',
  statusLabel: '',
  title: '',
  totalLabel: '',
}

export default RecipientSection
