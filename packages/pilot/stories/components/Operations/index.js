import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import {
  always,
  compose,
  defaultTo,
  equals,
  ifElse,
  is,
  path,
  pipe,
  reverse,
  sortBy,
  toLower,
} from 'ramda'
import Operations from '../../../src/components/Operations'
import getColumns from '../../../src/components/Operations/operationsTableColumns'
import operationsTypesLabels from '../../../src/models/operationTypes'
import mock from './mock.json'

const isAscending = equals('ascending')

const isNumber = is(Number)

const validateSort = ifElse(
  isNumber,
  defaultTo(0),
  compose(toLower, defaultTo(''))
)

const rowSort = accessor => sortBy(compose(
  validateSort,
  path(accessor)
))

const getSort = (accessor, order) => (
  isAscending(order) ?
    rowSort(accessor) :
    pipe(rowSort(accessor), reverse)
)

const getRowsSort = (rows, columns) =>
  (orderColumn, order) => {
    const referenceColumn = columns[orderColumn]
    const referenceAccessor = referenceColumn.accessor
    const sort = getSort(referenceAccessor, order)
    return sort(rows)
  }

const toggleOrder = ifElse(
  isAscending,
  always('descending'),
  always('ascending')
)

class OperationsState extends Component {
  constructor () {
    super()
    const { search: { operations } } = mock
    const columns = getColumns(operationsTypesLabels)
    const orderColumnIndex = columns.length - 1
    this.sortRows = getRowsSort(operations.rows, columns)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      columns,
      offset: 1,
      order: 'ascending',
      orderColumnIndex,
      rows: this.sortRows(orderColumnIndex, 'ascending'),
      total: operations.total,
      totalPages: 1,
    }
  }

  handleOrderChange (orderColumnIndex) {
    const order = toggleOrder(this.state.order)
    this.setState({
      order,
      orderColumnIndex,
      rows: this.sortRows(orderColumnIndex, order),
    })
  }

  handlePageChange () {
    action(`page changed to ${this.state.offset}`)
  }

  render () {
    const {
      columns,
      offset,
      order,
      orderColumnIndex,
      rows,
      total,
      totalPages,
    } = this.state

    return (
      <Operations
        columns={columns}
        emptyMessage="No items found"
        exportLabel="Export"
        currentPage={offset}
        ofLabel="of"
        onExport={() => null}
        onOrderChange={this.handleOrderChange}
        onPageChange={this.handlePageChange}
        order={order}
        orderColumnIndex={orderColumnIndex}
        rows={rows}
        subtitle={`Total of ${total} accounting entries`}
        title="Accounting posting history"
        totalPages={totalPages}
      />
    )
  }
}

export default OperationsState
