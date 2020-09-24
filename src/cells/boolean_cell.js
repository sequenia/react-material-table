import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'

const styles = (theme) => ({
  root: {}
})

class BooleanCell extends React.Component {
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
      this.state.value !== nextState.value ||
      JSON.stringify(this.state.column) !== nextState.column
    )
  }

  render() {
    const { classes, className, yesText, noText } = this.props
    const { value, column } = this.state

    if (!column) {
      return <React.Fragment />
    }

    return (
      <div className={clsx(classes.root, className)}>
        {value && <React.Fragment>{yesText}</React.Fragment>}
        {!value && <React.Fragment>{noText}</React.Fragment>}
      </div>
    )
  }
}

BooleanCell.propTypes = {
  yesText: PropTypes.string,
  noText: PropTypes.string
}

BooleanCell.defaultProps = {
  yesText: 'Yes',
  noText: 'No'
}

export default withStyles(styles)(BooleanCell)
