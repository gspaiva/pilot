import React from 'react'

import Section from '../../Section'
import TransactionDetailsCard from '../../../src/components/TransactionDetailsCard'

const labels = {
  acquirer_name: 'Operadora do cartão',
  acquirer_response_code: 'Resposta da operadora',
  antifraud_score: 'Score do antifraude',
  authorization_code: 'Código de autorização',
  capture_method: 'Método de captura',
  nsu: 'NSU',
  soft_descriptor: 'Soft Descriptor',
  subscription_id: 'ID da assinatura',
  tid: 'TID (ID da transação)',
}

/* eslint-disable sort-keys */
const contents = {
  tid: '3122173',
  acquirer_name: 'Pagar.me',
  acquirer_response_code: null,
  authorization_code: 'SQ0BEW',
  antifraud_score: 12,
  nsu: 3122173,
  soft_descriptor: 'casajardimsec',
  subscription_id: null,
  capture_method: 'ecommerce',
}
/* eslint-enable sort-keys */

const TransactionDetailsCardExample = () => (
  <Section>
    <TransactionDetailsCard
      contents={contents}
      labels={labels}
      title="detalhes da transação"
    />
  </Section>
)

export default TransactionDetailsCardExample
