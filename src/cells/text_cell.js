import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {}
});

class TextCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static getDerivedStateFromProps(props, state) {
    let { value } = props;
    if(value) {
      value = `${value}`.trim();
    }

    return {
      editable: props.editable,
      value: value,
      column: props.column
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.editable !== nextState.editable ||
           this.state.value !== nextState.value ||
           JSON.stringify(this.state.column) !== nextState.column;
  }

  render() {
    const { classes, className } = this.props;
    const { value, column } = this.state;
    const { formatter, format } = column;

    if(!column) {
      return <React.Fragment />
    }

    return <div className = { clsx(classes.root, className) } >
      {
        (!value || value === "") &&
        <React.Fragment>
          { "-" }
        </React.Fragment>
      }
      {
        value && value !== "" &&
        <React.Fragment>
          { formatter ? formatter.format(value, format) : value }
        </React.Fragment>
      }
    </div >
  }
}

export default withStyles(styles)(TextCell);