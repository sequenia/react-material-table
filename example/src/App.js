import React from 'react'

import TableView from '@sequenia/react-material-table'
import DescribingModel from '@sequenia/describing-model';

class TableModel extends DescribingModel {
  displayName(item) {
    return `${item.type} - ${item.name}`;
  }
 
  listCells(items = undefined) {
    return [
      {
        name: "type",
        displayName: "Model's type",
        type: "enum",
        data: [
          {
            key: "simple",
            value: "Simple"
          },
          {
            key: "extended",
            value: "Extended"
          },
          {
            key: "user_defined",
            value: "User defined"
          }
        ]
      },
      {
        name: "name",
        displayName: "Name",
        type: "text",
        sortKey: "name"
      }
    ]
  }
}

const TableModelInstance = new TableModel();

const App = () => {
  return <div>
    <TableView columns = { TableModelInstance.listCells() } 
               items = { [ { } ] }/>
  </div>  
}

export default App
