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

    const initalFormData = formatInitialData(props.general)

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
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        <Grid>
          <Row flex>
            <Col palm={12} tablet={6} desk={6} tv={4}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.general.form.name')}
                name="name"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={6} tv={4}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.general.form.full_name')}
                name="fullName"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={3} tv={2}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.general.form.cnpj')}
                name="cnpj"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={5} tv={5}>
              <FormInput
                disabled
                label={t('pages.settings.company.card.register.general.form.site_url')}
                name="siteUrl"
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
  general: PropTypes.shape({
    cnpj: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
}

CompanyGeneralForm.defaultProps = {
  onSubmit: data => data,
  t: t => t,
}

export default CompanyGeneralForm
