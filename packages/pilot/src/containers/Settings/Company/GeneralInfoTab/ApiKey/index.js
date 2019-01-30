import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import copyToClipBoard from 'clipboard-copy'
import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Col,
  Grid,
  Row,
} from 'former-kit'
import IconLock from 'emblematic-icons/svg/Lock32.svg'
import ApiKey from '../../../../../components/ApiKey'
import style from './style.css'

class ApiKeyContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      apiKeyCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      apiKeyCollapsed: !this.state.apiKeyCollapsed,
    })
  }

  renderContent () {
    const {
      apiKeys: {
        keys: {
          apiKey,
          encryptionKey,
        },
        title,
      },
      environment,
      t,
    } = this.props

    return (
      <CardContent>
        <Grid>
          <Row stretch>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <p>
                {t('pages.settings.company.card.general.headline.api')}
                {environment === 'test' &&
                  <Fragment>
                    &nbsp;
                    <strong>{t('pages.settings.company.card.general.api_key.test_advise')}</strong>
                  </Fragment>
                }
              </p>
            </Col>
          </Row>
          <Row stretch>
            <Col
              palm={12}
              tablet={1}
              desk={1}
              tv={1}
            >
              <strong className={style.title}>
                {t(`pages.settings.company.card.general.api_key.${title}`)}
              </strong>
            </Col>
            <Col
              palm={12}
              tablet={6}
              desk={6}
              tv={6}
            >
              <ApiKey
                title={t('pages.settings.company.card.general.api_key.api')}
                apiKey={apiKey}
                copyLabel={t('pages.settings.company.card.general.api_key.copy')}
                onCopy={copyToClipBoard}
              />
            </Col>
            <Col
              palm={12}
              tablet={6}
              desk={5}
              tv={5}
            >
              <ApiKey
                title={t('pages.settings.company.card.general.api_key.encryption_key')}
                apiKey={encryptionKey}
                copyLabel={t('pages.settings.company.card.general.api_key.copy')}
                onCopy={copyToClipBoard}
              />
            </Col>
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const {
      apiVersion,
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.apiKeyCollapsed}
          icon={<IconLock height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={
            <Fragment>
              {t('pages.settings.company.card.general.subtitle.api')}
              &nbsp;
              <strong>
                {t('pages.settings.company.card.general.subtitle.api_version')}
                &nbsp;
                {apiVersion}
              </strong>
            </Fragment>
          }
          title={t('pages.settings.company.card.general.title.api')}
        />
        {
          !this.state.apiKeyCollapsed ?
            this.renderContent() :
            null
        }
      </CardSection>
    )
  }
}

ApiKeyContainer.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  t: PropTypes.func.isRequired,
}

ApiKeyContainer.defaultProps = {
  apiKeys: null,
  apiVersion: null,
}

export default ApiKeyContainer
