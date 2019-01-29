import React from 'react'

import Section from '../../Section'
import CustomerCard from '../../../src/components/CustomerCard'

const labels = {
  birthday: 'Data de nascimento',
  city: 'Cidade',
  complementary: 'Complemento',
  document_number: 'CPF/CNPJ',
  email: 'E-mail',
  name: 'Nome do cliente',
  neighborhood: 'Bairro',
  phone: 'Telefone',
  state: 'Estado',
  street: 'Rua',
  street_number: 'N',
  zipcode: 'CEP',
}

const contents = {
  birthday: '21/12/1970',
  city: 'Middle Earth',
  complementary: 'apto 101',
  document_number: '12345678910',
  email: 'email@pagar.me',
  name: 'José dos Santos',
  neighborhood: 'Rivendell',
  phone: '(11) 90101-0101',
  state: 'SP',
  street: 'Rua Gomes de Carvalho',
  street_number: '1609',
  zipcode: '12.345-67',
}

const CustomerCardExample = () => (
  <Section>
    <CustomerCard
      title="Detalhes do cliente"
      labels={labels}
      contents={contents}
    />
  </Section>
)

export default CustomerCardExample
