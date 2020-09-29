import React from 'react'

import TableView from '@sequenia/react-material-table'
import DescribingModel from '@sequenia/describing-model';

const enumData = [
  {
    key: "At work",
    value: "working"
  },
  {
    key: "On vacation",
    value: "vacation"
  }  
];

const items = [
  {
    id: 1,
    name: "John Doe",
    status: "working",
    company: "A company of everything"
  },
];

class TableModel extends DescribingModel {
  displayName(item) {
    return `${item.type} - ${item.name}`;
  }
 
  listCells(items = undefined) {
    return [
      {
        name: "name",
        displayName: "Name",
        type: "text",
        sortKey: "name"
      },
      {
        name: "status",
        displayName: "Status",
        type: "enum",
        data: enumData
      },
      {
        name: "company",
        displayName: "Company",
        type: "text",
        sortKey: "company"
      }
    ]
  }
}

const TableModelInstance = new TableModel();

const App = () => {
  return <div>
    <TableView columns = { TableModelInstance.listCells() } 
               items = { items }/>
  </div>  
}

export default App
