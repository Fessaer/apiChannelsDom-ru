/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import formatDateToLocale from '../helpers/functionFormatReplaceDate';
// import { SubClassID } from '../config/report/conf'
import AlertMessage from './Alert'; 

const RenderTable = () => {
  const [globalState] = useContext(Context);
  let { elements } = globalState.fetch.report;

  if (elements === undefined) {
      elements = []
  }

  const sortElements = elements.map((item, index) => {
    const id = item['DateTime'] + index.toString()
    const dateTime = item['DateTime']
    const cameraName = item['CameraName']
    const image = <img className="photo" src={`data:image/png;base64,${item['Image']}`} alt="altImage" />
    const param1 = item['SubClassID']
    const param2 = item['Score']
    return {id: id, time: dateTime, cameraName: cameraName, image: image, param1: param1, param2: param2}
  })
  if (globalState.fetch.report.elements !== undefined) {
    if(globalState.fetch.report.elements.length === 0) return (
      <AlertMessage />
      )
  }
  return (
    <>
    {/* <Table striped bordered hover>
  <thead>
    <tr>
      <th width="10%">Дата и время</th>
      <th width="15%">Камера</th>
      <th>Фото</th>
      <th>Параметры</th>
    </tr>
  </thead>
  <tbody>
  {sortElements.map((item) => {
    return (<tr key={item.id}>
      <td className="mw-8">{formatDateToLocale(new Date(item.time), 'dd.mm.yyyy hh:MM:ss')}</td>
      <td>{item.cameraName}</td>
      <td>{item.image}</td>
      <td><p className="m-0">{SubClassID[item.param1]}</p>
          <p className="m-0">Уверенность: {item.param2}%</p></td>
      
      </tr>)
  })}
  </tbody>
</Table> */}
    </>
  )
}

export default RenderTable;