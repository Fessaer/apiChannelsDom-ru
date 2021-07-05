/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
// import '../Styles/renderTable.css';
import formatLocaleDate from '../helpers/formatDate';
import { SubClassID } from '../config/report/conf';
import { Col, Row } from 'antd';
import AlertMessage from './Alert'; 
const style = { display: 'flex', width: '100%',minWidth: 260, border: 'solid 1px #D3D3D3', borderRadius: 5, margin: '1px'};

const RenderPlate = () => {
  const [globalState] = useContext(Context);
  let { elements } = globalState.fetch.report;

  if (elements === undefined) {
    elements = [];
  }

  let countRenderItems = 0
  if (globalState.fetch.report.elements !== undefined) {
    if(globalState.fetch.report.elements.length === 0) return (
      <AlertMessage />
      )
  }

  return (
    <Row gutter={[8, 8]} justify="space-between" style={{display: 'flex'}}>
      {elements.map((item, index) => {
        const id = item['DateTime'] + index.toString()
        countRenderItems = countRenderItems + 1
        if (countRenderItems <= 20) return (
          <Col key={id} className="gutter-row"
          xs={{ span: 24, push: 0}} 
          sm={{ span: 12, push: 0}} 
          md={{ span: 12, push: 0}} 
          lg={{ span: 8, push: 0}} 
          xl={{ span: 6, push: 0}} 
          >
            <div style={style}>
              <div>
                <img className="photo" src={`data:image/png;base64,${item['Image']}`} alt="altImage" />
              </div>
              <div>
                <p style={{ "fontSize": "12px", padding: 10, margin: 0 }}>
                  {formatLocaleDate(item['DateTime'].substring(0, 10))}<br />
                  {item['DateTime'].substr(10)}<br />
                  {SubClassID[item['SubClassID']]}<br />
                  Уверенность: {item['Score']}%
                </p>
              </div>
              </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default RenderPlate;