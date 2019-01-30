import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconLocation from 'emblematic-icons/svg/Location32.svg'

import CompanyAddressForm from './CompanyAddressForm'

class CompanyInformation extends React.Component {
  constructor (props) {
    super(props)

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)

    this.state = {
      collapsed: true,
    }
  }

  handleSectionTitleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      address,
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.collapsed}
          icon={<IconLocation height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.register.subtitle.address')}
          title={t('pages.settings.company.card.register.title.address')}
        />
        {!this.state.collapsed && (
          <CardContent>
            <CompanyAddressForm t={t} address={address} />
          </CardContent>
        )}
      </CardSection>
    )
  }
}

CompanyInformation.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    complementary: PropTypes.string,
    neighborhood: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default CompanyInformation
