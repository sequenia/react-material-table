import React from 'react'
import './index.css'

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
    key: 1,
    busy: true,
    date: "2013-02-20T08:01:16.214Z",
    name: "John Doe",
    status: "working",
    company: "Company #1"
    
  },
  {
    id: 2,
    key: 2,
    busy: false,
    date: "2006-12-12T18:23:01.214Z",
    name: "Ken Block",
    status: "working",
    company: "Company #2",
  },
  {
    id: 3,
    key: 3,
    busy: false,
    date: "2016-07-12T08:13:01.214Z",
    name: "Max Payne",
    status: "working",
    company: "Company #3",
  },
  {
    id: 4,
    key: 4,
    busy: true,
    date: "2020-04-02T08:21:26.214Z",
    name: "Johny Bravo",
    status: "vacation",
    company: "Company #4",
  },
  { 
    id: 5,
    key: 5,
    busy: false,
    date: "2001-11-23T08:01:26.214Z",
    name: "Homer Simpson",
    status: "vacation",
    company: "Company #5",
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
        name: "date",
        displayName: "Date",
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
        type: "dateTime",
        sortKey: "date"
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
      },
      {
        name: "busy",
        displayName: "Busy",
        type: "boolean"
      }
    ]
  }
}

const TableModelInstance = new TableModel();

const App = () => {
  return <div className = "container">
    <h1>React Material Table</h1>
    <p>Custom table with sorting</p>
    <section className = "section"> 
      <TableView columns = { TableModelInstance.listCells() } 
                 items = { items }
                 wrapperLinkForCell = { (item, cell) => {
                  return <a href = { `/ololo/item/${item.id}`}>
                    { cell }
                  </a>
                 } } />
    </section>              
  </div>  
}

export default App
