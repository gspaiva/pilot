import {
  __,
  prop,
} from 'ramda'

const errorMessages = {
  acquirer: 'Adquirente',
  acquirer_timeout: 'Tempo limite da adquirente',
  antifraud: 'Antifraude',
  internal_error: 'Erro interno',
  no_acquirer: 'Sem adquirente',
}

const getErrorMessage = prop(__, errorMessages)

export default getErrorMessage
