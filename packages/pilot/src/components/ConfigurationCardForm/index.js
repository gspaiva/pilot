import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

const ConfigurationCardForm = ({
  children,
  collapsed,
  data,
  disabled,
  icon,
  onCancel,
  onChange,
  onClick,
  onSubmit,
  subtitle,
  t,
  title,
  validation,
}) => (
  <Card>
    <CardSection>
      <CardSectionDoubleLineTitle
        title={title}
        subtitle={subtitle}
        collapsed={collapsed}
        onClick={onClick}
        icon={icon}
      />
      {!collapsed &&
        <Form
          data={data}
          onChange={onChange}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={validation}
        >
          <CardContent>{children}</CardContent>

          <CardActions>
            <Button
              disabled={disabled}
              fill="outline"
              onClick={onCancel}
              type="reset"
            >
              {t('pages.settings.company.cancel')}
            </Button>
            <Button
              disabled={disabled}
              fill="gradient"
              type="submit"
            >
              {t('pages.settings.company.confirm')}
            </Button>
          </CardActions>
        </Form>
      }
    </CardSection>
  </Card>
)

ConfigurationCardForm.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  data: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  validation: PropTypes.shape({}),
}

ConfigurationCardForm.defaultProps = {
  collapsed: false,
  disabled: false,
  validation: null,
}

export default ConfigurationCardForm
