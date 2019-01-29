import React from 'react'
import PropTypes from 'prop-types'

import {
  compose,
  values,
} from 'ramda'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import routes from './routes'
import { requestLogout } from '../Account/actions'

import HeaderContainer from '../../containers/Header'

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(requestLogout())
  },
})

const mapStateToProps = ({ account: { user } }) => ({
  user,
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const Header = ({
  history: { goBack, push },
  onLogout,
  t,
  user,
}) => (
  <HeaderContainer
    onBack={goBack}
    onLogout={onLogout}
    onSettings={() => push(routes.accountSettings.path)}
    routes={values(routes)}
    t={t}
    user={user}
  />
)

Header.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default enhance(Header)
