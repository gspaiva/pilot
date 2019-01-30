import React from 'react'
import PropTypes from 'prop-types'

import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from 'former-kit'

import styles from './style.css'

const DARK_BASE = 'dark'
const LIGHT_BASE = 'light'

const getSecondaryBase = base => (
  base === DARK_BASE
    ? LIGHT_BASE
    : DARK_BASE
)

const Account = ({
  base,
  logo: Logo,
  primaryContent,
  secondaryContent,
  t,
}) => (
  <Landing className={styles.container}>
    <LandingPrimarySection base={base}>
      <div className={styles.columnContainer}>
        <div className={styles.primaryContent}>
          <div className={styles.logo}>
            <Logo alt={t('landing.logo')} />
          </div>
          {primaryContent}
        </div>
      </div>
    </LandingPrimarySection>
    <LandingSecondarySection base={getSecondaryBase(base)}>
      <div className={styles.columnContainer}>
        {secondaryContent}
      </div>
    </LandingSecondarySection>
  </Landing>
)

Account.propTypes = {
  base: PropTypes.oneOf([DARK_BASE, LIGHT_BASE]),
  logo: PropTypes.func.isRequired,
  primaryContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
}

Account.defaultProps = {
  base: DARK_BASE,
}

export default Account
