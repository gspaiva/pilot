import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info32.svg'

import CompanyAccountManagerForm from './CompanyAccountManagerForm'

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
      managingPartner,
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.collapsed}
          icon={<IconInfo height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.register.subtitle.managing_partner')}
          title={t('pages.settings.company.card.register.title.managing_partner')}
        />
        {!this.state.collapsed && (
          <CardContent>
            <CompanyAccountManagerForm
              t={t}
              managingPartner={managingPartner}
            />
          </CardContent>
        )}
      </CardSection>
    )
  }
}

CompanyInformation.propTypes = {
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default CompanyInformation
