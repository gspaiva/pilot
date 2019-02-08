import pagarme from 'pagarme'
import {
  identity,
  pathOr,
} from 'ramda'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { combineEpics } from 'redux-observable'
import cockpit from 'cockpit'
import env from '../../../environment'
import identifyUser from '../../../vendor/identifyUser'
import setCompany from '../../../vendor/setCompany'
import {
  ACCOUNT_RECEIVE,
  COMPANY_RECEIVE,
  failLogin,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  receiveAccount,
  receiveCompany,
  receiveLogin,
  receiveLogout,
  receiveRecipientBalance,
} from '.'

import { WITHDRAW_RECEIVE } from '../../Withdraw/actions'
import { activeCompanyLogin, inactiveCompanyLogin } from '../../../vendor/googleTagManager'

const getRecipientId = pathOr(null, ['account', 'company', 'default_recipient_id', env])

const loginEpic = action$ =>
  action$
    .ofType(LOGIN_REQUEST)
    .mergeMap(action => (
      pagarme.client.connect(action.payload)
        .then(cockpit)
        .then(receiveLogin)
        .catch((error) => {
          try {
            localStorage.removeItem('redux_localstorage_simple_account.sessionId')
          } catch (err) {
            console.warn(err.message) //eslint-disable-line
          }
          return failLogin(error)
        })
    ))

const accountEpic = action$ =>
  action$
    .ofType(LOGIN_RECEIVE)
    .mergeMap((action) => {
      const { error, payload: client } = action

      if (error) {
        return Promise.resolve(action.payload)
      }

      return client.user.current().catch(identity)
    })
    .map(receiveAccount)
    .do(({ error, payload }) => {
      if (error) {
        return
      }

      const {
        id,
        email,
        name,
        date_created: dateCreated,
        permission,
      } = payload

      identifyUser(
        id,
        email,
        name,
        dateCreated,
        permission,
        env
      )
    })

const companyEpic = (action$, store) =>
  action$
    .ofType(ACCOUNT_RECEIVE)
    .mergeMap(({ error, payload }) => {
      const { account: { client } } = store.getState()
      if (error) {
        return Promise.resolve(payload)
      }
      return client.company.current().catch(identity)
    })
    .map(receiveCompany)
    .do(({ error, payload }) => {
      if (error) {
        return
      }

      const {
        date_created: dateCreated,
        id,
        name,
        status,
      } = payload

      const {
        account: {
          user: {
            id: userId,
          },
        },
      } = store.getState()

      setCompany(
        id,
        name,
        dateCreated,
        status,
        userId
      )

      if (status === 'active') {
        activeCompanyLogin()
      } else {
        inactiveCompanyLogin()
      }
    })

const recipientBalanceEpic = (action$, store) =>
  action$
    .ofType(COMPANY_RECEIVE, WITHDRAW_RECEIVE)
    .mergeMap(({ error, payload }) => {
      const state = store.getState()
      const recipientId = getRecipientId(state)
      const { account: { client } } = state

      if (error) {
        return Promise.resolve(payload)
      }

      return client.recipient.balance(recipientId).catch(identity)
    })
    .map(receiveRecipientBalance)

const logoutEpic = (action$, store) =>
  action$
    .ofType(LOGOUT_REQUEST)
    .mergeMap(() => {
      const state = store.getState()
      const {
        account: {
          client,
          sessionId,
        },
      } = state

      return client.session
        .destroy(sessionId)
    })
    .map(receiveLogout)

export default combineEpics(
  loginEpic,
  accountEpic,
  companyEpic,
  recipientBalanceEpic,
  logoutEpic
)
