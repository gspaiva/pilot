import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../../Section'
import RecipientDetailConfig from '../../../../src/containers/RecipientDetails/Config'

const mockAccounts = [
  {
    name: 'First account',
    number: '0001',
    number_digit: '1',
    type: 'conta_corrente',
    agency: '777',
    bank: '340',
    id: '1',
  },
  {
    name: 'Second account',
    number: '0002',
    number_digit: '2',
    type: 'conta_corrente',
    agency: '888',
    agency_digit: '1',
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
  agency: '1111',
  bank: '001',
  id: '1',
  name: 'Conta Bancária',
  number_digit: '1',
  number: '11111',
  type: 'conta_corrente',
}

const RecipientDetailConfigExample = () => (
  <Section>
    <Card>
      <RecipientDetailConfig
        accounts={mockAccounts}
        bankAccount={mockBankAccount}
        anticipation={mockAnticipation}
        transfer={mockTransfer}
        onSaveAnticipation={action('Saved Anticipation Data')}
        onSaveTransfer={action('Saved Transfer Data')}
        onSaveBankAccount={action('Saved Bank Account Data')}
        onCancel={action('Cancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default RecipientDetailConfigExample
