import Form from 'react-vanilla-form'
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'

const PersonalInfoForm = ({
  onCancel,
  onSubmit,
  t,
}) => (
  <Form
    data={{
      company: '',
      email: '',
      name: '',
      password: '',
    }}
    onSubmit={onSubmit}
  >
    <CardContent>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('pages.settings.user.personal.name')}
              name="name"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('pages.settings.user.personal.email')}
              name="email"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('pages.settings.user.personal.mothername')}
              name="mothername"
              type="text"
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('pages.settings.user.personal.document')}
              name="document"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('pages.settings.user.personal.birthday')}
              name="birthday"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('pages.settings.user.personal.cpf')}
              name="cpf"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('pages.settings.user.personal.phone')}
              name="phone"
              type="text"
            />
          </Col>
        </Row>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
        type="reset"
        size="large"
        fill="outline"
        onClick={onCancel}
      >
        {t('pages.settings.user.personal.button.cancel')}
      </Button>
      <Button
        type="submit"
        size="large"
        fill="gradient"
      >
        {t('pages.settings.user.personal.button.save')}
      </Button>
    </CardActions>
  </Form>
)

PersonalInfoForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
}

PersonalInfoForm.defaultProps = {
  t: t => t,
}

export default PersonalInfoForm
