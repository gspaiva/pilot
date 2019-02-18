import React from 'react'
import { Card } from 'former-kit'

import Section from '../../../Section'
import RecipientDetailInfo from '../../../../src/containers/RecipientDetails/Info'

const identification = {
  cnpj: '11.111.111/1111-11',
  cnpjEmail: 'star@wars.com',
  cnpjInformation: true,
  cnpjName: 'Star Wars Ltda',
  cnpjPhone: '21 2222-2222',
  cnpjUrl: 'http://www.starwars.com',
  cpf: '111-111-111-11',
  cpfEmail: 'barroso@barroso.com',
  cpfInformation: false,
  cpfName: 'Guilherme Melo Barroso',
  cpfPhone: '21 99999-9999',
  cpfUrl: 'www.cpfUrl.com.br',
  documentType: 'cnpj',
  partnerNumber: '4',
  partner0: {
    cpf: '222.222.222-22',
    name: 'Luke Skywalker',
    email: 'mail@email.com',
  },
  partner1: {
    cpf: '111.111.111-11',
    name: 'Han Solo',
    email: 'mail@email.com',
  },
  partner2: {
    cpf: '333.333.333-33',
    name: 'Princess Leia',
    email: 'mail@email.com',
  },
  partner3: {
    cpf: '444.444.444-44',
    name: 'Chewie',
    email: 'mail@email.com',
  },
  partner4: {
    cpf: '',
    name: '',
    email: '',
  },
}

const metadata = {
  custom: 'custom data',
  fields: {
    abc: '123',
  },
}

const RecipientDetailInfoExample = () => (
  <Section>
    <Card>
      <RecipientDetailInfo
        identification={identification}
        metadata={metadata}
        t={t => t}
      />
    </Card>
  </Section>
)

export default RecipientDetailInfoExample
