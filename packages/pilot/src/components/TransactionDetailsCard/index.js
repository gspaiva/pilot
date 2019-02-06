import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
  CardTitle,
  Grid,
  Row,
  Col,
} from 'former-kit'
import {
  mapObjIndexed,
  values,
  splitEvery,
} from 'ramda'

import Property from '../Property'
import style from './style.css'

const objectFields = (labels, contents) => (
  mapObjIndexed((content, key) => (
    <Property
      title={labels[key]}
      value={content}
    />
  ), contents)
)

const fieldsToArray = (labels, contents) =>
  values(objectFields(labels, contents))

const fieldsColumns = (labels, contents) => {
  const fields = fieldsToArray(labels, contents)
  return splitEvery(fields.length / 3, fields)
}

const composeIndex = (parentIndex, index) => `${parentIndex}_col_${index}`

const TransactionDetailsCard = ({ contents, labels, title }) => (
  <Card>
    <CardTitle title={title} />
    <CardContent>
      <Grid>
        <Row className={style.propertyCustom}>
          {
            fieldsColumns(labels, contents).map((fields, parentIndex) =>
              fields.map((field, index) => (
                <Col
                  palm={12}
                  tablet={6}
                  desk={4}
                  tv={4}
                  key={composeIndex(parentIndex, index)}
                  className={style.propertyCustom}
                >
                  { field }
                </Col>
              )))
          }
        </Row>
      </Grid>
    </CardContent>
  </Card>
)

const shape = {
  acquirer_name: PropTypes.string,
  acquirer_response_code: PropTypes.string,
  authorization_code: PropTypes.string,
  capture_method: PropTypes.string,
  nsu: PropTypes.string,
  soft_descriptor: PropTypes.string,
  subscription_id: PropTypes.string,
  tid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

TransactionDetailsCard.propTypes = {
  contents: PropTypes.shape(shape).isRequired,
  labels: PropTypes.shape(shape).isRequired,
  title: PropTypes.string.isRequired,
}

export default TransactionDetailsCard
