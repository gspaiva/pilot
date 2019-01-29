import React from 'react'

import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import SidebarSections from '../../../src/components/SidebarSections'
import SidebarSummary from '../../../src/components/SidebarSummary'

const sections = {
  data: [
    {
      action: action('clicked'),
      actionTitle: 'Sacar',
      title: 'Disponível',
      value: <span><small>R$</small> 15.000,00</span>,
    },
    {
      action: action('clicked'),
      actionTitle: 'Antecipar',
      title: 'A receber',
      value: <span><small>R$</small> 70.000,00</span>,
    },
  ],
  hideMsg: 'Ocultar saldo',
  showMsg: 'Mostrar saldo',
  title: 'Pagar.me',
}

class SidebarSummaryExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
      summaryCollapsed: true,
    }
  }

  render () {
    const {
      collapsed,
      summaryCollapsed,
    } = this.state

    return (
      <Section title="With base dark">
        <div style={{ backgroundColor: '#383838' }}>
          {!collapsed &&
            <SidebarSummary
              collapsed={summaryCollapsed}
              onClick={() => this.setState({
                summaryCollapsed: !summaryCollapsed,
              })}
              subtitle={
                summaryCollapsed
                  ? `${sections.showMsg}`
                  : `${sections.hideMsg}`
              }
              title={sections.title}
            >
              <SidebarSections sections={sections.data} />
            </SidebarSummary>
          }
        </div>
      </Section>
    )
  }
}

export default SidebarSummaryExample
