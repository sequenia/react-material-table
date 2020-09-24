import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/styles'
import moment from 'moment'

const styles = (theme) => ({
  root: {},
  formattedDate: {},
  formattedTine: {}
})

class DateTimeCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    let { value } = props
    if (value) {
      value = `${value}`.trim()
    }
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
    const { classes, className } = this.props
    const { value, column } = this.state

    if (!column) {
      return <React.Fragment />
    }

    const { dateFormat, timeFormat } = column

    if (!value || value === '' || (!dateFormat && !timeFormat)) {
      return <div className={clsx(classes.root, className)}>-</div>
    }

    const date = moment.utc(DateTimeCell.addOffset(value, this.props))

    return (
      <div className={clsx(classes.root, className)}>
        {dateFormat && (
          <div className={classes.formattedDate}>{date.format(dateFormat)}</div>
        )}
        {timeFormat && (
          <div className={classes.formattedTime}>{date.format(timeFormat)}</div>
        )}
      </div>
    )
  }

  static addOffset(value, props) {
    if (!value) {
      return value
    }

    const {
      column: { timeFormat },
      utcOffset,
      serverDateFormat,
      serverDateTimeFormat
    } = props

    if (!timeFormat) {
      return moment(value).format(serverDateFormat)
    }
    let dateValue = moment.utc(value)
    dateValue = dateValue.hours(dateValue.hours() + utcOffset)

    return dateValue.format(serverDateTimeFormat)
  }

  static subtractOffset(value, props) {
    if (!value) {
      return value
    }

    const {
      column: { timeFormat },
      utcOffset,
      serverDateFormat,
      serverDateTimeFormat
    } = props

    if (!timeFormat) {
      return value.format(serverDateFormat)
    }

    const dateValue = value.hours(value.hours() - utcOffset)
    return dateValue.format(serverDateTimeFormat)
  }
}

DateTimeCell.defaultProps = {
  utcOffset: 0,
  serverDateFormat: 'YYYY-MM-DD',
  serverDateTimeFormat: 'YYYY-MM-DDTHH:mm:ss'
}

export default withStyles(styles)(DateTimeCell)
