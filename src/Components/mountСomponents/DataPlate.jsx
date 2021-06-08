/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import formatLocaleDate from '../formatDate';
let _ = require('lodash');

const RenderPlate = () => {
  const [inState] = useContext(Context);
  let { elements } = inState;
  const { loadingComplite } = inState;
  if (loadingComplite) {
  let countRenderItems = 0
  return (
    <div className="d-flex row flex-wrap justify-content-around">
      {elements.map((item) => {
        countRenderItems = countRenderItems + 1
        if(countRenderItems <= 20) return (
          <div key={_.uniqueId()} className="m-1 border border-grey rounded col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 d-flex">
            <div>
            <img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
            </div>
            <div>
              <p className="p-2 m-0" style={{"fontSize": "12px"}}>
                Дата: {formatLocaleDate(item.elements[0].elements[0].text.substring(0, 10))}<br />
                Время: {item.elements[0].elements[0].text.substr(10)}
                </p>
            </div>
          </div>
        )
      })}
    </div>
  )
  } else {
    return (
      <div>Loading</div>
    )
  }
}

export default RenderPlate;