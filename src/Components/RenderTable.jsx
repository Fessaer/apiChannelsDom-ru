import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Store';
import './Styles/renderTable.css';
import formatLocaleDate from './formatDate';
import { Pagination } from 'antd';
var _ = require('lodash');


export default function RenderTable() {
  const [inState, inSetState] = useContext(Context);
  console.log(inState, 'RenderTable')
  const {elements} = inState;
  const { loadingComplite } = inState;


  if (loadingComplite) {
  return (
    
    <div className="d-flex row flex-wrap justify-content-around">
      <div>
      <Pagination defaultCurrent={1} total={50} style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
      </div>
      
      {/* renderBar */}
      {elements.map((item) => {
        // console.log(item.elements[5].elements[0].text)
        return (
          <div key={_.uniqueId()} className="m-1 border border-grey rounded col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 d-flex">

            <div>
            <img className="photo" src={`data:image/png;base64,${item.elements[5].elements[0].text}`} alt="altImage" />
            </div>
            <div>
              <p className="p-2 m-0" style={{"fontSize": "12px"}}>
                Дата: {formatLocaleDate(item.elements[0].elements[0].text.substring(0, 10))}<br />
                
                Время: {item.elements[0].elements[0].text.substr(10)}
                </p>
                
                {/* Дата: {formatLocaleDate(day.text.substring(0, 10))}<br /> */}
                {/* Время: {time.text.substr(10)}<br />   */}
              
            </div>


          </div>
        )
      })}
      <div>
      <Pagination defaultCurrent={1} total={50} style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
      </div>
    </div>
  )
  } else {
    return (
      <div>Loading</div>
    )
  }
}
