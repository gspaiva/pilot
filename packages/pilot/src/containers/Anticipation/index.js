import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  assoc,
  identity,
  ifElse,
  map,
  pipe,
  propEq,
  toPairs,
} from 'ramda'
import {
  Card,
  CardContent,
  Col,
  Grid,
  Row,
  Steps,
} from 'former-kit'
import moment from 'moment'
import AnticipationConfirmation from './Confirmation'
import AnticipationForm from './Form'
import AnticipationResult from './Result'
import DetailsHead from '../../components/DetailsHead'
import formatAccountType from '../../formatters/accountType'
import formatAgencyAccount from '../../formatters/agencyAccount'
import formatCpfCnpj from '../../formatters/cpfCnpj'

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

class Anticipation extends Component {
  constructor () {
    super()

    this.getStepsStatus = this.getStepsStatus.bind(this)
    this.renderCurrentStep = this.renderCurrentStep.bind(this)
    this.renderRecipient = this.renderRecipient.bind(this)
  }

  getStepsStatus () {
    const { currentStep, stepsStatus } = this.props
    const steps = createStepsStatus(stepsStatus)

    return map(setCurrentStep(currentStep), steps)
  }

  renderRecipient () {
    const {
      recipient: {
        bank_account: {
          agencia,
          agencia_dv: agenciaDv,
          bank_code: bankCode,
          conta,
          conta_dv: contaDv,
          document_number: documentNumber,
          legal_name: legalName,
          type,
        },
      },
      t,
    } = this.props

    return (
      <Row>
        <Col
          desk={12}
          palm={12}
          tablet={12}
          tv={12}
        >
          <Card>
            <CardContent>
              <DetailsHead
                identifier={legalName}
                properties={[
                  {
                    children: bankCode,
                    title: t('models.bank_account.bank'),
                  },
                  {
                    children: formatAgencyAccount(agencia, agenciaDv),
                    title: t('models.bank_account.agency'),
                  },
                  {
                    children: formatAgencyAccount(conta, contaDv),
                    title: t('models.bank_account.account'),
                  },
                  {
                    children: formatAccountType(t, type),
                    title: t('models.bank_account.account_type'),
                  },
                  {
                    children: formatCpfCnpj(documentNumber),
                    title: t('models.bank_account.document'),
                  },
                ]}
                title={t('models.bank_account.legal_name')}
              />
            </CardContent>
          </Card>
        </Col>
      </Row>
    )
  }

  renderCurrentStep () {
    const {
      amount,
      approximateRequested,
      automaticTransfer,
      currentStep,
      date,
      error,
      loading,
      maximum,
      minimum,
      onCalculateSubmit,
      onCancel,
      onConfirmationConfirm,
      onConfirmationReturn,
      onDataConfirm,
      onDateChange,
      onFormChange,
      onTimeframeChange,
      onTryAgain,
      onViewStatement,
      recipient: {
        bank_account: bankAccount,
      },
      requested,
      statusMessage,
      stepsStatus,
      t,
      timeframe,
      totalCost,
      transferCost,
      validateDay,
    } = this.props

    return (
      <Fragment>
        {currentStep === 'data' && this.renderRecipient()}
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            {currentStep === 'data' &&
              <AnticipationForm
                amount={amount}
                approximateRequested={approximateRequested}
                bankAccount={bankAccount}
                cost={totalCost}
                date={date}
                error={error}
                isAutomaticTransfer={automaticTransfer}
                isValidDay={validateDay}
                loading={loading}
                maximum={maximum}
                minimum={minimum}
                onCalculateSubmit={onCalculateSubmit}
                onCancel={onCancel}
                onChange={onFormChange}
                onConfirm={onDataConfirm}
                onDateChange={onDateChange}
                onTimeframeChange={onTimeframeChange}
                requested={requested}
                t={t}
                timeframe={timeframe}
                transferCost={transferCost}
              />
            }

            {currentStep === 'confirmation' &&
              <AnticipationConfirmation
                amount={amount}
                automaticTransfer={automaticTransfer}
                bankAccount={bankAccount}
                date={date}
                disabled={loading}
                error={error}
                onCancel={onCancel}
                onConfirm={onConfirmationConfirm}
                onReturn={onConfirmationReturn}
                requested={approximateRequested}
                t={t}
                totalCost={totalCost}
              />
            }

            {currentStep === 'result' &&
              <AnticipationResult
                amount={amount}
                automaticTransfer={automaticTransfer}
                bankAccount={bankAccount}
                date={date}
                onTryAgain={onTryAgain}
                onViewStatement={onViewStatement}
                requested={approximateRequested}
                status={stepsStatus.result}
                statusMessage={statusMessage}
                t={t}
                timeframe={timeframe}
                totalCost={totalCost}
              />
            }
          </Col>
        </Row>
      </Fragment>
    )
  }

  render () {
    const { t } = this.props

    return (
      <Grid>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <Steps
                status={this.getStepsStatus()}
                steps={[
                  { id: 'data', title: t('pages.anticipation.data') },
                  { id: 'confirmation', title: t('pages.anticipation.confirmation') },
                  { id: 'result', title: t('pages.anticipation.conclusion') },
                ]}
              />
            </Card>
          </Col>
        </Row>
        {this.renderCurrentStep()}
      </Grid>
    )
  }
}

Anticipation.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number,
  automaticTransfer: PropTypes.bool.isRequired,
  currentStep: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirmationConfirm: PropTypes.func.isRequired,
  onConfirmationReturn: PropTypes.func.isRequired,
  onDataConfirm: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onTimeframeChange: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onViewStatement: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      agencia: PropTypes.string,
      agencia_dv: PropTypes.string,
      bank_code: PropTypes.string,
      conta: PropTypes.string,
      conta_dv: PropTypes.string,
      document_number: PropTypes.string,
      document_type: PropTypes.string,
      legal_name: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  requested: PropTypes.number.isRequired,
  statusMessage: PropTypes.string,
  stepsStatus: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf([
    'distributed',
    'end',
    'start',
  ]).isRequired,
  totalCost: PropTypes.number.isRequired,
  transferCost: PropTypes.number.isRequired,
  validateDay: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  approximateRequested: null,
  error: '',
  maximum: null,
  minimum: null,
  recipient: {
    bank_account: {
      agencia: '',
      agencia_dv: '',
      bank_code: '',
      conta: '',
      conta_dv: '',
      document_number: '',
      document_type: '',
      legal_name: '',
      type: '',
    },
  },
  statusMessage: '',
}

export default Anticipation
