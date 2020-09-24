import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'

import SmartLink from '../components/smart_link.js'

const styles = (theme) => ({
  link: {
    color: theme.palette.black,
    textDecoration: 'none',
    '&:focus': {
      color: theme.palette.black
    },
    '&:hover': {
      color: theme.palette.black,
      textDecoration: 'underline'
    }
  }
})

class ModelCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    const { value } = props

    return {
      editable: props.editable,
      value: value,
      column: props.column
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.editable !== nextState.editable ||
      JSON.stringify(this.state.value) !== JSON.stringify(nextState.value) ||
      JSON.stringify(this.state.column) !== nextState.column
    )
  }

  onClick = (event) => {
    event.stopPropagation()
  }

  content() {
    const { classes } = this.props
    const { value, column } = this.state
    const { model, urlFunc } = column

    const displayValue = model.displayValue(value)
    if (!displayValue || displayValue === '') {
      return <React.Fragment>-</React.Fragment>
    }
    let content = <React.Fragment>{displayValue}</React.Fragment>
    if (urlFunc) {
      content = (
        <SmartLink
          className={classes.link}
          to={urlFunc(value)}
          onClick={this.onClick}
        >
          {content}
        </SmartLink>
      )
    }
    return content
  }

  render() {
    const { classes, className } = this.props
    const { column } = this.state

    const { model } = column

    if (!column) {
      return <React.Fragment />
    }

    if (!model) {
      return <React.Fragment />
    }

    return <div className={clsx(classes.root, className)}>{this.content()}</div>
  }
}

export default withStyles(styles)(ModelCell)
