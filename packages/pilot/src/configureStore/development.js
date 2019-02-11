import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import { save, load } from 'redux-localstorage-simple'

import { rootEpic, rootReducer } from '../pages/actions'
import states from './states'

const epicMiddleware = createEpicMiddleware()

/* eslint-disable no-underscore-dangle, no-undef */

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
  : compose

/* eslint-disable no-underscore-dangle, no-undef */

const enhancer = composeEnhancers(applyMiddleware(
  epicMiddleware,
  save({
    states,
  })
))

const store = createStore(rootReducer, load({ states }), enhancer)

epicMiddleware.run(rootEpic)

export default store
