import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import {
  Checkbox,
  TableRow as MaterialTableRow,
  TableCell
} from '@material-ui/core'

import TextCell from './cells/text_cell.js'
import EnumCell from './cells/enum_cell.js'
import DateTimeCell from './cells/date_time_cell.js'
import ModelCell from './cells/model_cell.js'
import BooleanCell from './cells/boolean_cell.js'

const styles = (theme) => ({
  root: {},
  cell: {},
  linkCell: {
    padding: 0
  },
  link: {
    color: '#263238',
    textDecoration: 'none',
    display: 'block',
    padding: '16px',
    '&:focus': {
      color: '#263238',
      textDecoration: 'none'
    },
    '&:hover': {
      color: '#263238',
      textDecoration: 'none'
    }
  },
  hoverable: {
    cursor: 'pointer'
  }
})

class TableRow extends React.Component {
  constructor(props) {
    super(props)

    this.item = { ...{}, ...props.item }

    this.state = {}

    this.onChangeSelection = this.onChangeSelection.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      columns: [...props.columns]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.state.columns) !==
        JSON.stringify(nextState.columns) ||
      JSON.stringify(this.item) !== JSON.stringify(nextProps.item)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.item) !== JSON.stringify(prevProps.item)) {
      this.item = { ...this.props.item }
      this.forceUpdate()
    }
  }

  onChangeSelection(value) {}

  onChangeColumn = (column, newValue) => {
    const { onChangeItem } = this.props
    this.item[column.name] = newValue
    if (onChangeItem) {
      onChangeItem({ ...this.item }, column)
    }
  }

  onClick = () => {
    const { onClick } = this.props
    if (onClick) {
      onClick(this.item)
    }
  }

  cellContent(column) {
    const { classes } = this.props

    const { item } = this
    const { itemLink } = item

    const value = item[column.name]

    let component = <React.Fragment />
    if (column.renderFunction) {
      component = column.renderFunction(item, column, this.onChangeColumn)
    }
    if (column.type === 'enum') {
      component = (
        <EnumCell
          column={column}
          value={value}
          onChange={this.onChangeColumn}
        />
      )
    }
    if (column.type === 'text') {
      component = (
        <TextCell
          column={column}
          value={value}
          onChange={this.onChangeColumn}
        />
      )
    }
    if (column.type === 'dateTime') {
      component = (
        <DateTimeCell
          column={column}
          value={value}
          onChange={this.onChangeColumn}
        />
      )
    }
    if (column.type === 'model') {
      component = (
        <ModelCell
          column={column}
          value={value}
          onChange={this.onChangeColumn}
        />
      )
    }
    if (column.type === 'boolean') {
      component = (
        <BooleanCell
          column={column}
          value={value}
          onChange={this.onChangeColumn}
        />
      )
    }
    if (itemLink) {
      component = (
        <Link to={itemLink} className={classes.link}>
          {component}
        </Link>
      )
    }
    return component
  }

  render() {
    const { allowSelection, classes, className, hoverable } = this.props

    const { columns } = this.state

    const { item } = this
    const { selected, itemLink } = item

    if (columns.length === 0) {
      return <React.Fragment />
    }

    return (
      <MaterialTableRow
        className={clsx({
          [classes.root]: true,
          [classes.hoverable]: hoverable,
          [className]: true
        })}
        hover={hoverable}
        selected={selected}
        onClick={this.onClick}
      >
        {allowSelection && (
          <TableCell padding='checkbox'>
            <Checkbox
              checked={selected}
              color='primary'
              indeterminate={!selected}
              onChange={this.onChangeSelection}
            />
          </TableCell>
        )}
        {columns.map((column) => {
          const content = this.cellContent(column)
          return (
            <TableCell
              key={column.name}
              className={clsx({
                [classes.cell]: true,
                [classes.linkCell]: Boolean(itemLink)
              })}
            >
              {content}
            </TableCell>
          )
        })}
      </MaterialTableRow>
    )
  }
}

export default withStyles(styles)(TableRow)
