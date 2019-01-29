import React, { PureComponent } from 'react'

import Section from '../../Section'
import mock from '../../../src/components/RecipientSection/recipientMock'
import RecipientSection from '../../../src/components/RecipientSection'
import installmentColumns from '../../../src/components/RecipientSection/installmentTableColumns'
import getColumnFormatter from '../../../src/formatters/columnTranslator'

const t = translation => translation
class RecipientSectionState extends PureComponent {
  constructor () {
    super()
    this.handleCollapse = this.handleCollapse.bind(this)

    const formatColumns = getColumnFormatter(t)
    this.state = {
      collapsed: true,
      columns: formatColumns(installmentColumns),
      ...mock,
    }
  }
  handleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render () {
    const {
      amount,
      collapsed,
      columns,
      installments,
      liabilities,
      name,
      net_amount, // eslint-disable-line camelcase
      status,
    } = this.state

    return (
      <Section>
        <RecipientSection
          collapsed={collapsed}
          collapsedTitle="VISUALIZAR PARCELAS"
          columns={columns}
          installments={installments}
          liabilities={liabilities}
          liabilitiesLabel="Responsável por"
          name={name}
          netAmount={net_amount} // eslint-disable-line camelcase
          netAmountLabel="TOTAL LÍQUIDO(R$)"
          onDetailsClick={this.handleCollapse}
          outAmountLabel="TOTAL DE SAÍDAS(R$)"
          status={status}
          statusLabel="Status da parcela"
          title="OCULTAR PARCELAS"
          totalAmount={amount}
          totalLabel="TOTAL BRUTO(R$)"
        />
      </Section>
    )
  }
}

export default RecipientSectionState
