import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';

import I18n from "../../i18n.js";

const styles = theme => ({
  root: {}
});

class BooleanCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static getDerivedStateFromProps(props, state) {
    let { value } = props;

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

    if(!column) {
      return <React.Fragment />
    }

    return <div className = { clsx(classes.root, className) } >
      {
        value &&
        <React.Fragment>
          { I18n.t("shared.yes_text") }
        </React.Fragment>
      }
      {
        !value &&
        <React.Fragment>
          { I18n.t("shared.no_text") }
        </React.Fragment>
      }
    </div >
  }
}

export default withStyles(styles)(BooleanCell);