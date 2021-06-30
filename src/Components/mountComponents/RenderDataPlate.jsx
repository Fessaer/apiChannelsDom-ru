/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import formatLocaleDate from '../helpers/formatDate';
import { SubClassID } from '../config/report/conf'
let _ = require('lodash');

const RenderPlate = () => {
  const [globalState] = useContext(Context);
  let { elements } = globalState.fetch.report;

  if (elements === undefined) {
    elements = [];
  }

  let countRenderItems = 0
  if (globalState.fetch.report.elements !== undefined) {
    if(globalState.fetch.report.elements.length === 0) return (
      <div className="alert alert-warning" role="alert">
        События не найдены
      </div>
      )
  }
  return (
    <div className="row">
      {elements.map((item) => {
        countRenderItems = countRenderItems + 1
        if (countRenderItems <= 20) return (

          <div key={_.uniqueId()} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <div className="d-flex m-1 border border-grey rounded">
              <div>
                <img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
              </div>
              <div>
                <p className="p-2 m-0" style={{ "fontSize": "12px" }}>
                  {formatLocaleDate(item.elements[0].elements[0].text.substring(0, 10))}<br />
                  {item.elements[0].elements[0].text.substr(10)}<br />
                  {SubClassID[item.elements[6].elements[0].elements[0].elements[0].text]}<br />
                  Уверенность: {item.elements[6].elements[0].elements[1].elements[0].text}%
                </p>
              </div>
            </div>
          </div>

        )
      })}
    </div>
  )
}

export default RenderPlate;