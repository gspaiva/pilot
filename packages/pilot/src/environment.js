import { defaultTo } from 'ramda'

const {
  REACT_APP_API_ENVIRONMENT,
  REACT_APP_LIVE_URL,
  REACT_APP_TEST_URL,
} = process.env

const getLiveUrl = defaultTo('https://beta.dashboard.stg.pagarme.net/latest/index.html')
const getTestUrl = defaultTo('https://beta.dashboard.sandbox.stg.pagarme.net/latest/index.html')

const env = REACT_APP_API_ENVIRONMENT === 'live'
  ? 'live'
  : 'test'
const liveUrl = getLiveUrl(REACT_APP_LIVE_URL)
const testUrl = getTestUrl(REACT_APP_TEST_URL)

export {
  liveUrl,
  testUrl,
}

export default env
