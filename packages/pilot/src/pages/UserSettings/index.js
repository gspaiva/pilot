import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  compose,
  head,
  map,
  pathOr,
  pipe,
} from 'ramda'
import { translate } from 'react-i18next'

import UserSettings from '../../containers/Settings/User'

const mapStateToProps = ({
  account: { client, user },
}) => ({ client, user })

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class UserSettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordFormStatus: {
        error: null,
        success: false,
      },
    }
    this.handleRedefinePassword = this.handleRedefinePassword.bind(this)
  }

  /* eslint-disable-next-line camelcase */
  handleRedefinePassword ({ current_password, new_password }) {
    const { id } = this.props.user
    this.props.client
      .user.updatePassword({
        current_password,
        id,
        new_password,
      })
      .then(() => this.setState({
        passwordFormStatus: {
          error: null,
          success: true,
        },
      }))
      .catch((response) => {
        const formatErrors = pipe(
          pathOr([], ['response', 'errors']),
          map(error => error.message),
          head
        )

        this.setState({
          passwordFormStatus: {
            error: formatErrors(response),
            success: false,
          },
        })
      })
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <UserSettings
        passwordFormStatus={this.state.passwordFormStatus}
        handlePasswordFormSubmit={this.handleRedefinePassword}
        t={t}
      />
    )
  }
}

UserSettingsPage.propTypes = {
  client: PropTypes.shape({
    user: PropTypes.shape({
      updatePassword: PropTypes.func,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default enhanced(UserSettingsPage)
