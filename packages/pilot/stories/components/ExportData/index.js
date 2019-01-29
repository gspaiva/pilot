import React from 'react'
import { Col, Grid, Row } from 'former-kit'
import { action } from '@storybook/addon-actions'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'

import Section from '../../Section'
import ExportData from '../../../src/components/ExportData'

const exportOptions = [
  { action: action('CSV'), title: 'CSV' },
  { action: action('Excel'), title: 'Excel' },
  { action: action('PDF'), title: 'PDF' },
]

const ExportDataExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={6} tv={4}>
          <ExportData
            exportOptions={exportOptions}
            icon={<DownloadIcon width={16} height={16} />}
            placement="bottomStart"
            relevance="normal"
            subtitle="Export to"
          />
        </Col>

        <Col palm={12} tablet={6} tv={4}>
          <ExportData
            exportOptions={exportOptions}
            icon={<DownloadIcon width={16} height={16} />}
            placement="bottomStart"
            relevance="low"
            size="tiny"
            subtitle="Export to"
            title="Export"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default ExportDataExample

