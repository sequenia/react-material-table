import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody
} from '@material-ui/core';

import TableHeader from './table_header.js';
import TableRow from './table_row.js';

const styles = theme => ({
  root: {},
  content: {
    padding: 0
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

class TableView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.onChangeAllSelection = this.onChangeAllSelection.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      filterData: { ...props.filterData },
      columns: [...props.columns],
      allSelected: props.allSelected
    }
  }

  onChangeAllSelection(value) {

  }

  onChangeSelection(item, value) {

  }

  onChangeSort(orderColumn, orderType) {
    const { onChangeSort } = this.props;
    if(onChangeSort) {
      onChangeSort(orderColumn, orderType);
    }
  }

  onChangeItem = (item, index, changedColumn) => {
    const { onChangeItem } = this.props;
    if(onChangeItem) {
      onChangeItem(item, index, changedColumn);
    }
  }

  render() {
    const { allowSelection, classes, className, onClickRow } = this.props;
    const { header, children, items } = this.props;
    
    const { columns, allSelected, filterData } = this.state;

    if(columns.length === 0) {
      return <React.Fragment />
    }
    
    return <Card className = { clsx(classes.root, className) } >
      <CardContent className = { classes.content } >
        <PerfectScrollbar>
          <div className = { classes.inner } >
            <Table>
              {
                header
              }
              {
                !header &&
                <TableHeader columns = { columns } 
                             allSelected = { allSelected }
                             filterData = { filterData }
                             allowSelection = { allowSelection }
                             onChangeAllSelection = { this.onChangeAllSelection }
                             onChangeSort = { this.onChangeSort }  />
              }
              <TableBody>
                {
                  children
                }
                {
                  !children &&
                  <React.Fragment>
                    {
                      items.map((item, index) => {
                        return <TableRow key = { item.key }
                                         columns = { columns } 
                                         allowSelection = { allowSelection }
                                         item = { item }
                                         onChangeSelection = { (value) => this.onChangeAllSelection(item, value) }
                                         onChangeItem = { (item, column) => this.onChangeItem(item, index, column ) }
                                         hoverable = { Boolean(item.itemLink || onClickRow) }
                                         onClick = { (item) => {
                                           if(onClickRow)
                                            onClickRow(item, index)
                                         } } />
                      })
                    }
                  </React.Fragment>
                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  }
}

TableView.propTypes = {
  columns: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  filterData: PropTypes.object,
  onChangeSort: PropTypes.func,
  onClickRow: PropTypes.func,
  onChangeItem: PropTypes.func,
  header: PropTypes.node,
  allSelected: PropTypes.bool,
  allowSelection: PropTypes.bool
}

TableView.defaultProps = {
  allSelected: false,
  allowSelection: false
}

export default withStyles(styles)(TableView);