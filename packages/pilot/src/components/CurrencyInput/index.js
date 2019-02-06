import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  pipe,
  replace,
  omit,
} from 'ramda'

import decimalCurrency from '../../formatters/decimalCurrency'

const removeNonDigits = replace(/\D+/g, '')

const formatter = pipe(
  removeNonDigits,
  decimalCurrency
)

const notAllowedProps = [
  'inputRef',
  'multiline',
]

class CurrencyInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        formatted: formatter(props.value),
        normalized: removeNonDigits(props.value),
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleValueUpdate = this.handleValueUpdate.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { formatted, normalized } = this.state.value
    const { onChange, value } = this.props

    if (prevState.value.normalized !== normalized) {
      onChange(normalized, formatted)
    }

    if (prevProps.value !== value) {
      this.handleValueUpdate(value)
    }
  }

  handleValueUpdate (value) {
    const { max } = this.props
    const formatted = formatter(value)
    const normalized = removeNonDigits(value)

    if (!max || (max && normalized <= max)) {
      this.setState({
        value: {
          formatted,
          normalized,
        },
      })
    }
  }

  handleChange ({ target }) {
    this.handleValueUpdate(target.value)
  }

  render () {
    const {
      value,
    } = this.state

    return (
      <input
        {...omit(notAllowedProps, this.props)}
        onChange={this.handleChange}
        value={value.formatted}
      />
    )
  }
}

CurrencyInput.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

CurrencyInput.defaultProps = {
  max: null,
}

export default CurrencyInput
