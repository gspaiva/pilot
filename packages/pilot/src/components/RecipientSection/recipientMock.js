import moment from 'moment'

const recipient = {
  amount: 4000000123, // SplitRule
  installments: [
    {
      amount: 400000000,
      costs: {
        anticipation: 100000000,
        chargeback: 100000000,
        mdr: 100000000,
        refund: 100000000,
      },
      net_amount: 100000000,
      number: '1/4',
      original_payment_date: moment('2018-2-1'),
      payment_date: moment('2018-1-1'),
      status: 'waiting_payment',
    },
    {
      amount: 400000000,
      costs: {
        anticipation: 0,
        chargeback: 20,
        mdr: 150,
        refund: 0,
      },
      net_amount: 500,
      number: '2/4',
      original_payment_date: moment('2018-3-1'),
      payment_date: null,
      status: 'waiting_payment',
    },
    {
      amount: 400000000,
      costs: {
        anticipation: 0,
        chargeback: 20,
        mdr: 150,
        refund: 0,
      },
      net_amount: 500,
      number: '3/4',
      original_payment_date: moment('2018-4-1'),
      payment_date: null,
      status: 'waiting_payment',
    },
    {
      amount: 400000000,
      costs: {
        anticipation: 0,
        chargeback: 20,
        mdr: 150,
        refund: 0,
      },
      net_amount: 500,
      number: '4/4',
      original_payment_date: moment('2018-5-1'),
      payment_date: null,
      status: 'waiting_payment',
    },
  ],
  liabilities: ['MDR', 'Chargeback'], // SplitRules { mdr: charge_processing_fee, chargeback: liable }
  name: 'Loja da Maria', // SplitRules -> Recipients -> BankAccounts
  net_amount: 100000000, // SplitRule -> Payable
  status: 'chargedback',
}

export default recipient
