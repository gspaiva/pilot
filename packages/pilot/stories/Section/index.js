import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

const Section = ({
  children,
  className,
  title,
}) => (
  <section className={classnames(styles.section, className)}>
    {title &&
      <h2>{title}</h2>
    }
    <div>{children}</div>
  </section>
)

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
}

Section.defaultProps = {
  className: '',
  title: '',
}

export default Section
