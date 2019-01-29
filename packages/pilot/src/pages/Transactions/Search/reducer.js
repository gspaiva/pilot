import moment from 'moment'

import {
  SEARCH_REQUEST,
  SEARCH_RECEIVE,
} from './actions'

const initialState = {
  loading: true,
  query: {
    count: 15,
    dates: {
      end: moment(new Date()),
      start: moment(new Date()).subtract(30, 'days'),
    },
    filters: {},
    offset: 1,
    search: '',
    sort: {},
  },
}

export default function searchReducer (state, action) {
  switch (action.type) {
    case SEARCH_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: true,
        query,
      }
    }

    case SEARCH_RECEIVE: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: false,
        query,
      }
    }

    default:
      return state || initialState
  }
}
