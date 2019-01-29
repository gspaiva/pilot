import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import BoletoResult from '../../../../src/containers/Refund/BoletoResult'
import style from './style.css'

const t = translate => translate

const BoletoResultExample = () => (
  <Section className={style.section}>
    <BoletoResult
      amount={125000000}
      bankAccount={{
        agencia: '1234',
        agencia_dv: '5',
        bank_code: '000',
        conta: '17000',
        conta_dv: '0',
        document_number: '53431319050',
        legal_name: 'João da silva',
        type: 'conta_corrente',
      }}
      onTryAgain={action('onTryAgain')}
      onViewTransaction={action('onViewTransaction')}
      refundAmount="125000000"
      status="success"
      statusMessage="A transação foi estornada com sucesso"
      t={t}
    />
  </Section>
)

export default BoletoResultExample
