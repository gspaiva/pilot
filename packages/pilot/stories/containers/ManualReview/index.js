import React from 'react'
import { identity } from 'ramda'
import PropTypes from 'prop-types'
import { action as storybookAction } from '@storybook/addon-actions'
import ManualReview from '../../../src/containers/ManualReview'

const ManualReviewState = ({
  action,
  hasError,
  statusMessage,
  stepStatus,
}) => (
  <ManualReview
    action={action}
    hasError={hasError}
    isOpen
    loading={false}
    onCancel={storybookAction('cancel')}
    onConfirm={storybookAction('submit')}
    onReprocessRestart={storybookAction('reprocess restart')}
    onRetry={storybookAction('retry')}
    onViewTransaction={storybookAction('view transaction')}
    statusMessage={statusMessage}
    stepStatus={stepStatus}
    t={identity}
    transaction={{
      amount: 2000000,
      card: {
        first_digits: '123456',
        holder_name: 'Lorem Ipsum de Consectetuer e Amet',
        last_digits: '7890',
      },
      id: 1,
      payment: {
        installments: 48,
      },
    }}
    transactionId={12345}
  />
)

ManualReviewState.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  hasError: PropTypes.bool,
  statusMessage: PropTypes.string,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.string,
    result: PropTypes.string,
  }),
}

ManualReviewState.defaultProps = {
  hasError: false,
  statusMessage: '',
  stepStatus: {
    confirmation: 'current',
    result: 'pending',
  },
}

const ManualReviewStepApproveConfirmation = () => (
  <ManualReviewState
    action="approve"
    stepStatus={{
      confirmation: 'current',
      result: 'pending',
    }}
  />
)

const ManualReviewStepApproveResult = () => (
  <ManualReviewState
    action="approve"
    stepStatus={{
      confirmation: 'success',
      result: 'current',
    }}
  />
)

const ManualReviewStepRefuseConfirmation = () => (
  <ManualReviewState
    action="refuse"
    stepStatus={{
      confirmation: 'current',
      result: 'pending',
    }}
  />
)

const ManualReviewStepRefuseResult = () => (
  <ManualReviewState
    action="refuse"
    stepStatus={{
      confirmation: 'success',
      result: 'current',
    }}
  />
)

const ManualReviewStepResultError = () => (
  <ManualReviewState
    action="approve"
    stepStatus={{
      confirmation: 'success',
      result: 'error',
    }}
  />
)

export {
  ManualReviewStepApproveConfirmation,
  ManualReviewStepApproveResult,
  ManualReviewStepRefuseConfirmation,
  ManualReviewStepRefuseResult,
  ManualReviewStepResultError,
}
