import React from 'react'

import Section from '../../Section'
import BoletoRefundDetails from '../../../src/components/BoletoRefundDetails'

const labels = {
  account: 'Conta',
  accountType: 'Tipo de conta',
  agency: 'Agência',
  amount: 'Valor',
  bank: 'Banco',
  documentNumber: 'CPF/CNPJ',
  legalName: 'Nome/Razão social do favorecido',
  refundAmount: 'Valor do estorno',
}

const contents = {
  account: '12345678901',
  accountType: 'Conta corrente',
  accountVd: '000',
  agency: '1234567',
  agencyVd: '00',
  amount: 20000000,
  bank: '000 - Banco de teste',
  documentNumber: '000.000.000-00',
  legalName: 'Lorem Ipsum de Consecteteu e Amet',
  refundAmount: '19000000',
}

const BoletoRefundDetailsExample = () => (
  <Section>
    <BoletoRefundDetails
      contents={contents}
      labels={labels}
      title="Dados do estorno"
    />
  </Section>
)

export default BoletoRefundDetailsExample
