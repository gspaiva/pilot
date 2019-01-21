import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../../Section'
import RecipientDetailConfig from '../../../../src/containers/RecipientDetails/Config'

const mockAccounts = [
  {
    name: 'First account',
    number: '0001',
    type: 'conta_corrente',
    agency: '7',
    bank: '340',
    id: '1',
  },
  {
    name: 'Second account',
    number: '0002',
    type: 'conta_corrente',
    agency: '8',
    bank: '340',
    id: '2',
  },
]

const mockAnticipation = {
  anticipationDays: '25',
  anticipationModel: 'automatic_volume',
  anticipationVolumePercentage: '85',
}

const mockTransfer = {
  transferDay: '5',
  transferEnabled: true,
  transferInterval: 'weekly',
  transferWeekday: 'wednesday',
}

const mockBankAccount = {
  name: '',
  number: '',
  type: '',
  agency: '',
  bank: '',
  id: '',
}

const RecipientDetailConfigExample = () => (
  <Section>
    <Card>
      <RecipientDetailConfig
        accounts={mockAccounts}
        bankAccount={mockBankAccount}
        anticipation={mockAnticipation}
        transfer={mockTransfer}
        onSave={action('Saved')}
        onCancel={action('Cancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default RecipientDetailConfigExample
