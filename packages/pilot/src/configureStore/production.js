import {
  applyMiddleware,
  createStore,
} from 'redux'
import {
  save,
  load,
} from 'redux-localstorage-simple'

import { createEpicMiddleware } from 'redux-observable'

import { rootEpic, rootReducer } from '../pages/actions'
import states from './states'

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  load({ states }),
  applyMiddleware(
    createEpicMiddleware(rootEpic),
    save({ states })
  )
)

epicMiddleware.run(rootEpic)

export default store
