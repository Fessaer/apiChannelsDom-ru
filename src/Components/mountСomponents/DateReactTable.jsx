/* eslint-disable array-callback-return */
import React, { useContext, useMemo } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';

// import formatLocaleDate from '../formatDate';
// import 'react-table/react-table.css'
// var ReactTables = require("react-table").default;
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
let _ = require('lodash');




const RenderReactTable = () => {
  const [inState] = useContext(Context);
  const { elements } = inState;
  const columns = [{
    dataField: 'time',
    text: 'time'
  }, {
    dataField: 'cameraName',
    text: 'cameraName'
  }, {
    dataField: 'image',
    text: 'image'
  },
  {
    dataField: 'param1',
    text: 'param1'
  },
  {
    dataField: 'param2',
    text: 'param2'
  }
];
const expandRow = {
  renderer: (row, rowIndex) => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <img className="photo" src={`data:image/png;base64,${row.image}`} alt="altImage" />
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};
  const sortElements = elements.map((item) => {
    const id = _.uniqueId();
    const dateTime = item.elements[0].elements[0].text
    const cameraName = item.elements[2].elements[0].text
    // let image = new Image();
    // image.src = `data:image/png;base64,${item.elements[5].elements[0].text}`;
    const image = item.elements[5].elements[0].text //<img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
    const param1 = item.elements[6].elements[0].elements[0].elements[0].text
    const param2 = item.elements[6].elements[0].elements[1].elements[0].text
    console.log(param1)
    console.log(param2)
    return {id: id, time: dateTime, cameraName: cameraName, image: image, param1: param1, param2: param2}
  })
  console.log(elements)
  return (
    <>
    <BootstrapTable keyField={'id'} data={sortElements} columns={ columns } expandRow={ expandRow }/>
    <button onClick={()=>{console.log('1')}}>test</button>
    </>
  )
}

export default RenderReactTable;