import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow as MaterialTableRow,
  TableSortLabel
} from '@material-ui/core'

const styles = (theme) => ({
  columnName: {
    display: 'block'
  }
})

class TableHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChangeSort = this.onChangeSort.bind(this)
    this.onChangeAllSelection = this.onChangeAllSelection.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      allSelected: props.allSelected,
      columns: [...props.columns],
      filterData: {
        ...state.filterData,
        ...props.filterData
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.allSelected !== nextState.allSelected ||
      JSON.stringify(this.state.columns) !==
        JSON.stringify(nextState.columns) ||
      JSON.stringify(this.state.filterData) !==
        JSON.stringify(nextState.filterData)
    )
  }

  onChangeAllSelection(value) {}

  onChangeSort(column) {
    const { onChangeSort } = this.props
    const { filterData } = this.state
    const { orderType, orderColumn } = filterData

    let newOrderColumn
    let newOrderType = 'asc'

    if (column.sortKey === orderColumn) {
      newOrderType = orderType === 'asc' ? 'desc' : 'asc'
    }
    newOrderColumn = column.sortKey

    if (onChangeSort) {
      onChangeSort(newOrderColumn, newOrderType)
    }
  }

  render() {
    const { allowSelection, classes, className } = this.props

    const { allSelected, columns } = this.state

    if (columns.length === 0) {
      return <React.Fragment />
    }

    return (
      <TableHead className={clsx(classes.root, className)}>
        <MaterialTableRow>
          {allowSelection && (
            <TableCell padding='checkbox'>
              <Checkbox
                checked={allSelected}
                color='primary'
                indeterminate={!allSelected}
                onChange={this.onChangeAllSelection}
              />
            </TableCell>
          )}
          {columns.map((column) => {
            return this.headerContent(column)
          })}
        </MaterialTableRow>
      </TableHead>
    )
  }

  headerContent(column) {
    const { classes } = this.props

    const { filterData } = this.state
    const { orderType, orderColumn } = filterData

    let cell = <span className={classes.columnName}>{column.displayName}</span>

    if (column.sortKey) {
      cell = (
        <TableSortLabel
          active={column.sortKey === orderColumn}
          direction={column.sortKey === orderColumn ? orderType : 'asc'}
          onClick={() => this.onChangeSort(column)}
        >
          {cell}
        </TableSortLabel>
      )
    }

    return (
      <TableCell
        key={column.name}
        sortDirection={
          column.sortKey === orderColumn && column.sortKey ? orderType : false
        }
      >
        {cell}
      </TableCell>
    )
  }
}

export default withStyles(styles)(TableHeader)
