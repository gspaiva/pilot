import Balance32 from 'emblematic-icons/svg/Extract32.svg'
import Configuration32 from 'emblematic-icons/svg/Configuration32.svg'
import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Withdraw32 from 'emblematic-icons/svg/Withdraw32.svg'
import { Balance } from '../Balance'
import Anticipation from '../Anticipation'
import CompanySettings from '../CompanySettings'
import Transactions from '../Transactions'
import UserSettings from '../UserSettings'
import Withdraw from '../Withdraw'

export default {
  accountSettings: {
    component: UserSettings,
    exact: true,
    hidden: true,
    icon: Configuration32,
    path: '/account/settings',
    title: 'pages.settings.user.menu',
  },
  anticipation: {
    component: Anticipation,
    exact: true,
    hidden: true,
    icon: Balance32,
    path: '/anticipation/:id?',
    title: 'pages.anticipation.title',
  },
  balance: {
    component: Balance,
    exact: true,
    icon: Balance32,
    path: '/balance/:id?',
    title: 'pages.balance.title',
  },
  companySettings: {
    component: CompanySettings,
    exact: true,
    icon: Configuration32,
    path: '/settings',
    title: 'pages.settings.company.menu',
  },
  transactions: {
    component: Transactions,
    exact: true,
    icon: Transaction32,
    path: '/transactions',
    title: 'pages.transactions.title',
  },
  transactionsDetails: {
    exact: true,
    hidden: true,
    path: '/transactions/:id',
    title: 'pages.transaction.title',
  },
  withdrawRoot: {
    component: Withdraw,
    hidden: true,
    icon: Withdraw32,
    path: '/withdraw/:id?',
    title: 'pages.withdraw.title',
  },
}
