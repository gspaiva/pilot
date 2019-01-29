import React from 'react'
import { action } from '@storybook/addon-actions'

import TransferError from '../../../src/components/TransferError'

const TransferErrorExample = () => (
  <TransferError
    actionLabel="Tentar Novamente"
    message="Algo inesperado aconteceu, mas seu dinheiro continua seguro com a gente."
    onClick={action('click')}
  />
)
export default TransferErrorExample
