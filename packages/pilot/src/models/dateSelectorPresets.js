export default [
  {
    key: 'today',
    label: 'Hoje',
    date: () => 0,
    mode: 'single',
  },
  {
    key: 'last',
    label: 'Últimos:',
    list: [
      {
        key: 'last-7',
        label: '7 dias',
        date: () => -7,
        mode: 'period',
      },
      {
        key: 'last-15',
        label: '15 dias',
        date: () => -15,
        mode: 'period',
      },
      {
        key: 'last-30',
        label: '30 dias',
        date: () => -30,
        mode: 'period',
      },
      {
        key: 'last-60',
        label: '60 dias',
        date: () => -60,
        mode: 'period',
      },
    ],
  },
  {
    key: 'custom',
    label: 'Customizado:',
    list: [
      {
        key: 'single',
        label: 'Dia',
        date: () => null,
        mode: 'single',
      },
      {
        key: 'period',
        label: 'Período',
        date: () => null,
        mode: 'period',
      },
    ],
  },
]
