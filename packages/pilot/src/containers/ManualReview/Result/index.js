import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconSuccess from 'emblematic-icons/svg/Check32.svg'
import IconError from 'emblematic-icons/svg/ClearClose32.svg'
import {
  Alert,
  Button,
  Col,
  Grid,
  ModalActions,
  ModalContent,
  Row,
} from 'former-kit'
import style from './style.css'

const getErrorMessage = (action, errorMessage, t) => {
  if (errorMessage === 'pages.manual_review.result_error_message') {
    return t(errorMessage, { action: t(`models.antifraud_analyses.status.${action}`) })
  }

  return t(errorMessage)
}

const Result = ({
  action,
  errorMessage,
  onRetry,
  onViewTransaction,
  stepStatusResult,
  t,
}) => (
  <Fragment>
    <ModalContent>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={12} tv={12}>
            {stepStatusResult === 'error'
                ?
                  <Alert
                    icon={<IconError width={16} height={16} />}
                    type="error"
                  >
                    <span>{getErrorMessage(action, errorMessage, t)}</span>
                  </Alert>
                :
                  <Alert
                    icon={<IconSuccess width={16} height={16} />}
                    type="success"
                  >
                    <span>
                      {t('pages.manual_review.result_prefix_message')}
                      &nbsp;
                      <strong className={style.textHighlight}>
                        {
                          action === 'approve'
                          ? t('models.antifraud_analyses.status.approved')
                          : t('models.antifraud_analyses.status.refused')
                        }
                      </strong>
                      &nbsp;
                      {t('pages.manual_review.result_suffix_message')}
                    </span>
                  </Alert>
              }
          </Col>
        </Row>
      </Grid>
    </ModalContent>
    <ModalActions>
      {stepStatusResult === 'error'
        ?
          <Button
            fill="outline"
            onClick={onRetry}
          >
            {t('pages.manual_review.result_error_try_again')}
          </Button>
        :
          <Button
            fill="outline"
            onClick={onViewTransaction}
          >
            {t('pages.manual_review.result_success_view_transaction')}
          </Button>
      }
    </ModalActions>
  </Fragment>
)

Result.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  errorMessage: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  stepStatusResult: PropTypes.oneOf(['current', 'error']).isRequired,
  t: PropTypes.func.isRequired,
}

Result.defaultProps = {
  errorMessage: null,
}

export default Result
