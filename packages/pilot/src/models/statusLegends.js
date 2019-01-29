const status = {
  paid: {
    color: '#17c9b2',
    text: 'Paga',
    acronym: 'P',
  },
  analyzing: {
    color: '#0b6e69',
    text: 'Em análise',
    acronym: 'EA',
  },
  authorized: {
    color: '#b6ca2d',
    text: 'Autorizada',
    acronym: 'A',
  },
  pending_review: {
    color: '#fbbb27',
    text: 'Revisão pendente',
    acronym: 'RP',
  },
  pending_refund: {
    color: '#33206c',
    text: 'Estorno pendente',
    acronym: 'EP',
  },
  processing: {
    color: '#561e6a',
    text: 'Processando',
    acronym: 'PR',
  },
  waiting_payment: {
    color: '#0b6e69',
    text: 'Aguardando pagamento',
    acronym: 'AP',
  },
  refused: {
    color: '#da272c',
    text: 'Recusada',
    acronym: 'R',
  },
  refunded: {
    color: '#613fc7',
    text: 'Estornada',
    acronym: 'E',
  },
  chargedback: {
    color: '#f16f27',
    text: 'Chargeback',
    acronym: 'CB',
  },
  unavailable: {
    acronym: 'IN',
    color: '#a0a0a0',
    text: 'Indisponível',
  },
  waiting_funds: {
    color: '#0b6e69',
    text: 'Aguardando pagamento',
    acronym: 'AP',
  },
  chargedback_refund: {
    color: '#ac4e19',
    text: 'Chargeback reapresentado',
    acronym: 'CBR',
  },
  suspended: {
    color: '#bf5316',
    text: 'Suspensa',
    acronym: 'SU',
  },
  cancelled: {
    color: '#da272c',
    text: 'Cancelada',
    acronym: 'CA',
  },
}

export default status
