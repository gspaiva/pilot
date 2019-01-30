import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconError from 'emblematic-icons/svg/ClearClose32.svg'
import IconSuccess from 'emblematic-icons/svg/Check32.svg'
import {
  Alert,
  Button,
  Col,
  Grid,
  ModalActions,
  ModalContent,
  Row,
} from 'former-kit'
import CopyButton from '../../../components/CopyButton'
import ReprocessDetails from '../../../components/ReprocessDetails'
import formatCardNumber from '../../../formatters/cardNumber'
import formatCurrency from '../../../formatters/currency'

const validateOnRestart = ({ onRestart, status }, propName) => {
  if (
    propName === 'onRestart'
    && status === 'error'
    && !onRestart
  ) {
    throw new Error('The prop onRestart must be a function when hasError is true')
  }
}

const Result = ({
  amount,
  cardFirstDigits,
  cardLastDigits,
  holderName,
  installments,
  onCopyIdClick,
  onRestart,
  onViewTransactionClick,
  status,
  statusMessage,
  t,
}) => (
  <Fragment>
    <ModalContent>
      <Grid>
        <Row stretch>
          <Col palm={12} tablet={12} desk={12} tv={12}>
            <Alert
              icon={
                  (status !== 'error')
                    ? <IconSuccess width={16} height={16} />
                    : <IconError width={16} height={16} />
                }
              type={
                status !== 'error'
                  ? 'success'
                  : 'error'
              }
            >
              <span>{statusMessage}</span>
            </Alert>
          </Col>
        </Row>
        {status !== 'error' &&
          <Row stretch>
            <Col palm={12} tablet={12} desk={12} tv={12}>
              <ReprocessDetails
                labels={{
                  amount: t('amount'),
                  cardNumber: t('card_number'),
                  holderName: t('holder_name'),
                  installments: t('installments'),
                }}
                contents={{
                  amount: formatCurrency(amount),
                  cardNumber: `${formatCardNumber(cardFirstDigits)} ${cardLastDigits}`,
                  holderName,
                  installments: t('installment', { count: installments }),
                }}
              />
            </Col>
          </Row>
        }
      </Grid>
    </ModalContent>
    <ModalActions>
      {status === 'error'
        ?
          <Button
            fill="outline"
            onClick={onRestart}
          >
            {t('try_again')}
          </Button>
        :
          <Fragment>
            <CopyButton
              feedbackText={t('copied_to_clipboard')}
              feedbackTimeout={1000}
              fill="outline"
              onClick={onCopyIdClick}
              title={t('copy_id')}
            />
            <Button
              fill="outline"
              onClick={onViewTransactionClick}
            >
              {t('view_transaction')}
            </Button>
          </Fragment>
      }
    </ModalActions>
  </Fragment>
)

Result.propTypes = {
  amount: PropTypes.number.isRequired,
  cardFirstDigits: PropTypes.string.isRequired,
  cardLastDigits: PropTypes.string.isRequired,
  holderName: PropTypes.string.isRequired,
  installments: PropTypes.number.isRequired,
  onCopyIdClick: PropTypes.func.isRequired,
  onRestart: validateOnRestart,
  onViewTransactionClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    'current',
    'error',
    'pending',
    'success',
  ]).isRequired,
  statusMessage: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

Result.defaultProps = {
  onRestart: null,
}

export default Result
