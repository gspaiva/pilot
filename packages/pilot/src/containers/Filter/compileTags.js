import {
  eqBy,
  innerJoin,
  map,
  objOf,
  prop,
} from 'ramda'

const compileTags = (options, values = {}) =>
  map(
    ({ items, key, name }) => ({
      items: map(
        prop('label'),
        innerJoin(
          eqBy(prop('value')),
          items,
          map(objOf('value'), values[key] || [])
        )
      ),
      key,
      name,
    }),
    options
  )

export default compileTags
