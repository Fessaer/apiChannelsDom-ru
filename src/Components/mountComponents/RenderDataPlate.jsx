/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
// import '../Styles/renderTable.css';
import formatLocaleDate from '../helpers/formatDate';
import { SubClassID } from '../config/report/conf';
import { Col, Row, Alert } from 'antd';

let _ = require('lodash');
const style = { display: 'flex', maxWidth: 410, minWidth: 210, border: 'solid 1px #D3D3D3', borderRadius: 5, margin: '1px'};

const RenderPlate = () => {
  const [globalState] = useContext(Context);
  let { elements } = globalState.fetch.report;

  if (elements === undefined) {
    elements = [];
  }

  let countRenderItems = 0
  if (globalState.fetch.report.elements !== undefined) {
    if(globalState.fetch.report.elements.length === 0) return (
      <Alert message="События не найдены" type="warning" />
      )
  }
  
  return (
    <Row gutter={[0, 8]} justify="space-between" style={{display: 'flex', padding: '0px 8px'}}>
      {elements.map((item) => {
        countRenderItems = countRenderItems + 1
        if (countRenderItems <= 20) return (
          <Col key={_.uniqueId()} className="gutter-row" 
          sm={{ span: 12, push: 0}} 
          md={{ span: 8, push: 0}} 
          lg={{ span: 8, push: 0}} 
          xl={{ span: 6, push: 0}} 
          style={style}>
              <div>
                <img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
              </div>
              <div>
                <p style={{ "fontSize": "12px", padding: 10, margin: 0 }}>
                  {formatLocaleDate(item.elements[0].elements[0].text.substring(0, 10))}<br />
                  {item.elements[0].elements[0].text.substr(10)}<br />
                  {SubClassID[item.elements[6].elements[0].elements[0].elements[0].text]}<br />
                  Уверенность: {item.elements[6].elements[0].elements[1].elements[0].text}%
                </p>
              </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default RenderPlate;