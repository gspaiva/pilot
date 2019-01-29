import React, { PureComponent } from 'react'

import recipientsMock from '../../../src/containers/RecipientList/recipientListMock'
import RecipientList from '../../../src/containers/RecipientList'
import installmentColumns from '../../../src/components/RecipientSection/installmentTableColumns'
import getColumnFormatter from '../../../src/formatters/columnTranslator'

const t = translation => translation

class RecipientListState extends PureComponent {
  constructor () {
    super()
    this.handleCollapse = this.handleCollapse.bind(this)

    const formatColumns = getColumnFormatter(t)
    this.state = {
      collapsed: true,
      columns: formatColumns(installmentColumns),
      recipients: recipientsMock,
    }
  }

  handleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      columns,
      recipients,
    } = this.state

    return (
      <RecipientList
        installmentsTableColumns={columns}
        recipients={recipients}
        collapseInstallmentTitle="VISUALIZAR PARCELAS"
        expandInstallmentTitle="OCULTAR PARCELAS"
        liabilitiesLabel="Responsável por"
        netAmountLabel="TOTAL LÍQUIDO(R$)"
        outAmountLabel="TOTAL DE SAÍDAS(R$)"
        statusLabel="Status da parcela"
        installmentTotalLabel="TOTAL BRUTO(R$)"
        title="DIVISÃO ENTRE RECEBEDORES"
        totalTitle="VALOR TOTAL BRUTO (R$)"
        total="120,00"
        totalRecipientsLabel="RECEBEDORES:"
        noRecipientLabel="NENHUM RECEBEDOR"
      />
    )
  }
}

export default RecipientListState
