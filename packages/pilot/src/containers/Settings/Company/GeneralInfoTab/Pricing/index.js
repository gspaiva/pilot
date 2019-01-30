import PropTypes from 'prop-types'
import React from 'react'

import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Col,
  Grid,
  Row,
} from 'former-kit'

import { intersperse } from 'ramda'

import IconPercent from 'emblematic-icons/svg/Percent32.svg'

import formatCurrency from '../../../../../formatters/currency'

const sectionColumns = {
  psp: 4,
  transfers: 8,
}

class Pricing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pricingCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.renderPricing = this.renderPricing.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      pricingCollapsed: !this.state.pricingCollapsed,
    })
  }

  renderPricing () {
    const {
      pricing,
      t,
    } = this.props

    /* eslint-disable react/no-array-index-key */
    return pricing.map(({ mainTitle, subItems }, index) => (
      <Col
        key={`${mainTitle}-${index}`}
        palm={12}
        tablet={12}
        desk={sectionColumns[mainTitle] || 12}
        tv={sectionColumns[mainTitle] || 12}
      >
        <p>
          <strong>
            {t(`pages.settings.company.card.general.rate.${mainTitle}`)}
          </strong>
        </p>
        <Grid>
          <Row flex>
            {subItems.map(({ prices, title: serviceTitle }) => (
              <Col key={serviceTitle} tablet={6} palm={12}>
                <span>
                  {t(`pages.settings.company.card.general.rate.${serviceTitle}`)}
                </span>
                <strong>
                  {intersperse(
                    ' + ',
                    prices.map(({ unit, value }) => (
                      <span key={`${unit}:${value}`}>
                        {unit === 'real' && formatCurrency(value)}
                        {unit === 'percentage' && `${value}%`}
                      </span>
                    ))
                  )}
                </strong>
              </Col>
            ))}
          </Row>
        </Grid>
      </Col>
    ))
    /* eslint-enable react/no-array-index-key */
  }

  renderContent () {
    const {
      pricing,
      t,
    } = this.props

    return (
      <CardContent>
        <span>
          {t('pages.settings.company.card.general.headline.rate')}
        </span>
        <Grid>
          <Row>
            {pricing && this.renderPricing()}
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.pricingCollapsed}
          icon={<IconPercent height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.general.subtitle.rate')}
          title={t('pages.settings.company.card.general.title.rate')}
        />
        {!this.state.pricingCollapsed
          && this.renderContent()
        }
      </CardSection>
    )
  }
}

Pricing.propTypes = {
  pricing: PropTypes.arrayOf(PropTypes.shape({
    mainTitle: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(PropTypes.shape({
      prices: PropTypes.arrayOf(PropTypes.shape({
        unit: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })).isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

export default Pricing
