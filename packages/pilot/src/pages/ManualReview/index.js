import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, path } from 'ramda'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import ManualReviewContainer from '../../containers/ManualReview'

const mapStateToProps = ({
  account: { client },
}) => ({ client })

const enhanced = compose(
  translate(),
  connect(mapStateToProps),
  withRouter
)

class InvalidPasswordError extends Error {
  constructor () {
    super()

    this.name = 'InvalidPasswordError'
  }
}

const normalizeErrorMessage = (error) => {
  const errorMessage = path(['response', 'errors', 0, 'message'], error)
  if (errorMessage === 'Cannot create antifraud analysis for transaction that is not pending review.') {
    return 'pages.manual_review.result_error_is_not_pending_review'
  }

  return 'pages.manual_review.result_error_message'
}

class ManualReview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errorMessage: null,
      stepStatus: {
        confirmation: 'current',
        result: 'pending',
      },
    }

    this.handleTryAgain = this.handleTryAgain.bind(this)
    this.transactionAnalyzed = this.transactionAnalyzed.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    if (this.transactionAnalyzed()) {
      this.props.onFinish()
    }

    this.props.onClose()
  }

  transactionAnalyzed () {
    return this.state.stepStatus.result === 'current'
  }

  handleTryAgain () {
    this.setState({
      errorMessage: null,
      stepStatus: {
        confirmation: 'current',
        result: 'pending',
      },
    })
  }

  handleConfirm (password) {
    const {
      action,
      client,
      t,
      transactionId,
    } = this.props

    this.setState({
      errorMessage: null,
      stepStatus: {
        confirmation: 'current',
        result: 'pending',
      },
    })

    client.session
      .verify({
        id: client.authentication.session_id,
        password,
      })
      .then(({ valid }) => {
        if (!valid) {
          throw new InvalidPasswordError()
        }

        return client.antifraudAnalyses.create({
          status: action === 'approve'
            ? 'approved'
            : 'refused',
          transactionId,
        })
      })
      .then(() => {
        this.setState({
          errorMessage: null,
          stepStatus: {
            confirmation: 'success',
            result: 'current',
          },
        })
      })
      .catch((error) => {
        if (error.name === 'InvalidPasswordError') {
          this.setState({
            errorMessage: t('pages.manual_review.password_invalid_error'),
            stepStatus: {
              confirmation: 'error',
              result: 'pending',
            },
          })
        } else {
          const errorMessage = normalizeErrorMessage(error)

          this.setState({
            errorMessage,
            stepStatus: {
              confirmation: 'success',
              result: 'error',
            },
          })
        }
      })
  }

  render () {
    const {
      action,
      isOpen,
      t,
      transactionId,
    } = this.props

    const {
      errorMessage,
      stepStatus,
    } = this.state

    return (
      <ManualReviewContainer
        action={action}
        errorMessage={errorMessage}
        isOpen={isOpen}
        onCancel={this.handleClose}
        onConfirm={this.handleConfirm}
        onRetry={this.handleTryAgain}
        onViewTransaction={this.handleClose}
        stepStatus={stepStatus}
        t={t}
        transactionId={transactionId}
      />
    )
  }
}

ManualReview.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transactionId: PropTypes.number.isRequired,
}

export default enhanced(ManualReview)
