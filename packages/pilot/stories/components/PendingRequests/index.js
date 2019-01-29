import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import PendingRequests from '../../../src/components/PendingRequests'

const requests = [
  {
    amount: 'R$ 2.342.342,50',
    created_at: '02/07',
    title: 'Saque',
  },
  {
    amount: 'R$ 2.300,00',
    created_at: '01/07',
    title: 'Antecipação',
  },
  {
    amount: 'R$ 200,00',
    created_at: '01/07',
    title: 'Antecipação',
  },
]
const PendingRequestsExample = () => (
  <Section>
    <PendingRequests
      title="Solicitações pendentes"
      requests={requests}
      onCancel={action('cancel-request')}
    />
  </Section>
)

export default PendingRequestsExample
