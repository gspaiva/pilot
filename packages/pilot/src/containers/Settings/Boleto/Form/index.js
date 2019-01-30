import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import IconBarcode from 'emblematic-icons/svg/BarCode32.svg'
import ConfigurationCardForm from '../../../../components/ConfigurationCardForm'

import lessThan from '../../../../validation/lessThan'
import numberValidation from '../../../../validation/number'
import requiredValidation from '../../../../validation/required'

class BoletoForm extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: true,
    }

    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      collapsed,
    } = this.state

    const {
      actionsDisabled,
      daysToAddInExpirationDate,
      disabled,
      instructions,
      instructionsOptions,
      onCancel,
      onChange,
      onSubmit,
      t,
    } = this.props

    const isNumber = numberValidation(t('pages.settings.company.boleto.number'))
    const isRequired = requiredValidation(t('pages.settings.company.boleto.required'))
    const daysToAddInExpirationDateLabel = t('pages.settings.company.boleto.daysToAddInExpirationDate.label')

    return (
      <CardContent>
        <ConfigurationCardForm
          collapsed={collapsed}
          data={{
            daysToAddInExpirationDate,
            instructions,
          }}
          disabled={actionsDisabled}
          icon={<IconBarcode width={16} height={16} />}
          onCancel={onCancel}
          onChange={onChange}
          onClick={this.toggleForm}
          onSubmit={onSubmit}
          subtitle={t(
            'pages.settings.company.boleto.subtitle',
            { count: Number(daysToAddInExpirationDate) }
          )}
          t={t}
          title={t('pages.settings.company.card.product.boleto.title')}
          validation={{
            daysToAddInExpirationDate: [
              isRequired,
              isNumber,
              lessThan(
                0,
                t('pages.settings.company.boleto.greater_than_or_equal')
              ),
            ],
            instructions: isRequired,
          }}
        >
          <p>{t('pages.settings.company.boleto.description')}</p>

          <Grid>
            <Row flex>
              <Col
                desk={2}
                palm={2}
                tablet={2}
                tv={2}
              >
                <FormInput
                  disabled={disabled}
                  label={daysToAddInExpirationDateLabel}
                  name="daysToAddInExpirationDate"
                />
              </Col>

              <Col
                desk={6}
                palm={6}
                tablet={6}
                tv={6}
              >
                <FormDropdown
                  disabled={disabled}
                  key={instructions}
                  label={
                    t('pages.settings.company.boleto.instructions.label')
                  }
                  name="instructions"
                  options={instructionsOptions}
                  placeholder={
                    t('pages.settings.company.boleto.instructions.placeholder')
                  }
                />
              </Col>
            </Row>
          </Grid>
        </ConfigurationCardForm>
      </CardContent>
    )
  }
}

BoletoForm.propTypes = {
  actionsDisabled: PropTypes.bool.isRequired,
  daysToAddInExpirationDate: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  instructions: PropTypes.string.isRequired,
  instructionsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BoletoForm.defaultProps = {
  disabled: false,
}

export default BoletoForm
