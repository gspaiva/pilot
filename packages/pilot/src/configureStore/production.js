import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux'
import {
  save,
  load,
} from 'redux-localstorage-simple'

import { createEpicMiddleware } from 'redux-observable'

import { rootEpic, rootReducer } from '../pages/actions'
import states from './states'

const epicMiddleware = createEpicMiddleware()

const enhancers = compose(applyMiddleware(
  createEpicMiddleware(rootEpic),
  save({ states })
))

const store = createStore(
  rootReducer,
  load({ states }),
  enhancers
)

epicMiddleware.run(rootEpic)

export default store
