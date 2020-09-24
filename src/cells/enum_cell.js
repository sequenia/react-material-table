import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {}
});

class EnumCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      editable: props.editable,
      value: props.value,
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

    if(!column) {
      return <React.Fragment />
    }

    if(!column.enum) {
      return <React.Fragment  />
    }
    
    return <div className = { clsx(classes.root, className) } >
      { column.enum.label(value) }
    </div >
  }
}

export default withStyles(styles)(EnumCell);