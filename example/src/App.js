import React, { useEffect, useState } from 'react'
import './index.css'

import TableView from '@sequenia/react-material-table'
import DescribingModel from '@sequenia/describing-model';

const statusEnum = [
  {
    key: "At work",
    value: "working"
  },
  {
    key: "On vacation",
    value: "vacation"
  }  
];

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
