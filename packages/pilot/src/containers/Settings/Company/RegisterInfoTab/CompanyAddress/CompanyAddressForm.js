import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import {
  always,
  complement,
  isEmpty,
  isNil,
  mapObjIndexed,
  unless,
} from 'ramda'

const replaceNilForString = num => unless(
  complement(isNil),
  always(''),
  num
)

const formatInitialData = mapObjIndexed(replaceNilForString)

class CompanyGeneralForm extends Component {
  constructor (props) {
    super(props)

    const initalFormData = formatInitialData(props.address)

    this.state = {
      currentFormData: initalFormData,
    }

    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormChange (data) {
    this.setState({
      currentFormData: data,
    })
  }

  handleCancellation () {
    this.setState({
      currentFormData: this.initalFormData,
    })
  }

  handleFormSubmit (data, formErrors) {
    if (isEmpty(formErrors)) {
      this.props.onSubmit(data)
    }
  }
  render () {
    const {
      t,
    } = this.props

    return (
      <Form
        customErrorProp="error"
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        <Grid>
          <Row>
            <Col palm={12} tablet={12} desk={4} tv={3}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.street')}
                name="street"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={2} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.street_number')}
                name="streetNumber"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={3} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.complementary')}
                name="complementary"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={3} tv={3}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.neighborhood')}
                name="neighborhood"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col palm={12} tablet={12} desk={3} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.city')}
                name="city"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={3} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.state')}
                name="state"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={3} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.address.form.zipcode')}
                name="zipcode"
                type="text"
              />
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }
}

CompanyGeneralForm.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    complementary: PropTypes.string,
    neighborhood: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
}

CompanyGeneralForm.defaultProps = {
  onSubmit: data => data,
  t: t => t,
}

export default CompanyGeneralForm
