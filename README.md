# @sequenia/react-material-table

> custom table with sorting etc.

[![NPM](https://img.shields.io/npm/v/@sequenia/react-material-table.svg)](https://www.npmjs.com/package/@sequenia/react-material-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
https://sequenia.github.io/react-material-table/

## Requirements

React v16.0.0 and above, @material-ui/core v4.9.0 and above, @sequenia/describing-model v0.0.2 and above

## Install

```bash
npm install --save @sequenia/react-material-table
```

## Usage

```jsx
import React, { useEffect, useState } from 'react'

import TableView from '@sequenia/react-material-table'
import DescribingModel from '@sequenia/describing-model';

/* describing models for tables */

class WorkersTableModel extends DescribingModel {
 
  listCells(items = undefined) {
    return [
      {
        name: "name",
        displayName: "Name",
        type: "text"
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
        data: statusEnum,
        sortKey: "status"
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
        type: "boolean",
        sortKey: "busy"
      },
      /* column cell for custom component */
      {
        name: "clickToAlert",
        displayName: "Click to alert",
        renderFunction: item => {
          return <button onClick = { () => alert(`Wake up, ${item.name}!`) }>
            Click to Alert
          </button>
        }
      }
    ]
  }
}

class SearchEnginesTableModel extends DescribingModel {

  listCells(items = undefined) {
    return [
      {
        name: "name",
        displayName: "Name",
        type: "text"
      },
      {
        name: "founded",
        displayName: "Founded",
        dateFormat: "DD.MM.YYYY",
        type: "dateTime"
      },
      {
        name: "link",
        displayName: "Link",
        type: "text"
      }
    ]
  }
}

const WorkersTableModelInstance = new WorkersTableModel();
const SearchEnginesTableModelInstance = new SearchEnginesTableModel();

/* data items for tables */

const workersItems = [
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
 (...)
];

const searchEnginesItems = [
  {
    name: "Google",
    founded: "04.09.1998",
    link: "http://www.google.com/"
  },
  {
    name: "Baidu",
    founded: "01.01.2000",
    link: "http://www.baidu.com/"
  },
  {
    name: "Yahoo",
    founded: "02.02.1995",
    link: "http://www.yahoo.com/"
  }
]

/* this code you can see on https://sequenia.github.io/react-material-table/ */

const App = () => {
  const [items, setItems] = useState(workersItems);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
      setItems(items);
    }, [items]
) ;

  const onChangeSort = (orderColumn, orderType) => {
    let sortedItems

    if (orderType === "asc") {
      sortedItems = items.slice().sort((a, b) => {
        return ('' + a[orderColumn]).localeCompare(b[orderColumn]);
      });
    }
    if (orderType === "desc") {
      sortedItems = items.slice().sort((a, b) => {
        return ('' + b[orderColumn]).localeCompare(a[orderColumn]);
      });
    }
    setItems(sortedItems);
    setFilterData({ orderColumn, orderType })
  }

  return <div className = "container">
    <h1>React Material Table</h1>
    <p>Custom table with sorting</p>
    <section className = "section"> 
      <h3>Table with sorting</h3>
      <TableView columns = { WorkersTableModelInstance.listCells() } 
                 className = "table-view" /* custom css class */ 
                 items = { items }
                 filterData = { filterData }
                 onChangeSort = { onChangeSort }/>
    </section>
    <section className = "section">
    <h3>Table with clickable row</h3>
      <TableView columns = { SearchEnginesTableModelInstance.listCells() }
                 items = { searchEnginesItems } 
                 wrapperLinkForCell = { (item, cell) => {
                 return <a href = { `${item.link}`}
                           target = "_blank" 
                           rel = "noopener noreferrer">
                  { cell }
                 </a>
                 } }/>
    </section>                
  </div>
}

export default App



```

## License

MIT © [sequenia](https://github.com/sequenia)
