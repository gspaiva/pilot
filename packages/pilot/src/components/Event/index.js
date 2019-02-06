/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {
  is,
  head,
} from 'ramda'
import IconChevronUp from 'emblematic-icons/svg/ChevronUp24.svg'
import IconChevronDown from 'emblematic-icons/svg/ChevronDown24.svg'

import style from './style.css'

const getValidActiveColor = (active, color) => (
  active
    ? color
    : '#fff'
)
const renderIndicatorArrow = (collapsed, active, color) => (
  <span style={{ color: getValidActiveColor(active, color) }}>
    {
      collapsed
        ? <IconChevronDown width={12} height={12} />
        : <IconChevronUp width={12} height={12} />
    }
  </span>
)

class Event extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: this.props.collapsed,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      active,
      children,
      color,
      number,
      title,
    } = this.props

    const { collapsed } = this.state

    const childrenIsArray = is(Array, children)

    return (
      <div
        className={cx(style.event, {
          [style.active]: active,
          [style.hasEvents]: childrenIsArray,
        })}
        onClick={this.handleCollapse}
        role="button"
        style={{ backgroundColor: getValidActiveColor(active, color) }}
        tabIndex="0"
      >
        <header className={style.header}>
          <span
            className={style.number}
            style={{ color: getValidActiveColor(active, color) }}
          >
            {number}
          </span>
          <h3 className={style.title}>{title}</h3>
        </header>

        <div className={style.info}>
          {
            collapsed && childrenIsArray
              ? head(children)
              : children
          }
        </div>

        <div className={style.indicator}>
          {
            childrenIsArray && renderIndicatorArrow(collapsed, active, color)
          }
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

Event.defaultProps = {
  active: false,
  collapsed: false,
}

export default Event
