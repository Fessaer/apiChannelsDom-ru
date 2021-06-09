/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import Table from 'react-bootstrap/Table'
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
let _ = require('lodash');

const RenderReactTable = () => {
  const [inState] = useContext(Context);
  const { elements } = inState;
  const sortElements = elements.map((item) => {
    const id = _.uniqueId();
    const dateTime = item.elements[0].elements[0].text
    const cameraName = item.elements[2].elements[0].text
    // let image = new Image();
    // image.src = `data:image/png;base64,${item.elements[5].elements[0].text}`;
    const image = <img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
    const param1 = item.elements[6].elements[0].elements[0].elements[0].text
    const param2 = item.elements[6].elements[0].elements[1].elements[0].text
    console.log(param1)
    console.log(param2)
    return {id: id, time: dateTime, cameraName: cameraName, image: image, param1: param1, param2: param2}
  })
  console.log(elements)
  return (
    <>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th width="10%">Дата и время</th>
      <th width="15%">Камера</th>
      <th>image</th>
      <th>Параметры</th>
      {/* <th>param2</th> */}
    </tr>
  </thead>
  <tbody>
  {sortElements.map((item) => {
    return (<tr key={item.id}>
      <td className="mw-8">{formatDateToLocale(new Date(item.time), 'dd.mm.yyyy hh:MM:ss')}</td>
      <td>{item.cameraName}</td>
      <td>{item.image}</td>
      <td><p>Нарушение: {item.param1}</p>
          <p>Уверенность: {item.param2}</p></td>
      {/* <td>{item.param2}</td> */}
      
      </tr>)
  })}
  </tbody>
</Table>
    </>
  )
}

export default RenderReactTable;