import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'

const styles = (theme) => ({
  root: {}
})

class EnumCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      editable: props.editable,
      value: props.value,
      column: props.column
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.editable !== nextState.editable ||
      this.state.value !== nextState.value ||
      JSON.stringify(this.state.column) !== nextState.column
    )
  }

  rawValues() {
    const { column } = this.state
    const { data } = column
    const values = data.map((item) => {
      return item.value
    })
    return values
  }

  values() {
    const { column } = this.state
    const { data } = column
    const result = {}
    this.rawValues().forEach((rawValue, index) => {
      result[rawValue] = {
        key: data[index].key,
        value: rawValue
      }
    })
    return result
  }

  label(value) {
    if (!value) {
      return '-'
    }
    const enumValue = this.values()[value]
    if (!enumValue) {
      return '-'
    }
    return enumValue.key
  }

  render() {
    const { classes, className } = this.props
    const { value, column } = this.state

    if (!column) {
      return <React.Fragment />
    }

    if (!column.data) {
      return <React.Fragment />
    }

    return (
      <div className={clsx(classes.root, className)}>{this.label(value)}</div>
    )
  }
}

export default withStyles(styles)(EnumCell)
