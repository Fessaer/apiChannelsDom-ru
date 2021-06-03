import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Store';
import './Styles/renderTable.css';
import formatLocaleDate from './formatDate';
import { Pagination } from 'antd';
var _ = require('lodash');
var convert = require('xml-js');


export default function RenderTable() {
  const [inState, inSetState] = useContext(Context);
  // console.log(inState, 'RenderTable')
  let { elements } = inState;
  const { loadingComplite } = inState;
  let { offsetRenderMap } = inState;
  const { startDate } = inState;
  const { endDate } = inState;
  let { offset } = inState;
  const { SessionID } = inState;
  const { ChangePasswordAtNextLogin } = inState;
  let { renderCountItems } = inState;
  const handlPagination = (e, f) => {
    console.log(e, f)
    renderCountItems = f
    const newOffSet = (e - 1) * 20
    console.log(newOffSet, 'offsetRenderMap')
    console.log(renderCountItems, 'renderCountItems')
    // console.log(renderCountItems, 'renderCountItems')

    offsetRenderMap = newOffSet;
    inSetState({...inState, renderCountItems, offsetRenderMap})
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    const requestForm = new FormData()
    // const newOffSet = (e - 1) * 20
    // console.log(newOffSet)
    // offset = newOffSet;
    // inSetState({...inState, offset})
  // ChangePasswordAtNextLogin
  // SessionID
    
    // console.log(inState, 'inState users')
  // console.log(SessionID, ChangePasswordAtNextLogin)
    // requestForm.set('SessionID', SessionID)
    // requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
    // requestForm.set('Analytics', 'TPlusCoveralls')
    // requestForm.set('From', `${startDate.toISOString().substring(0, 10) + ' 00:00:00'}`)
    // requestForm.set('To', `${endDate.toISOString().substring(0, 10) + ' 23:59:59'}`)
    // requestForm.set('Offset', offset)
    // // requestForm.set('Limit', 20)
    // requestForm.set('TPlusCoveralls[ClassID]', '3')
    // requestForm.set('TPlusCoveralls[EventSubjectID]', '553')
    
    //   await fetch(apiUrlGetData, {
    //     method: 'POST',
    //     body: requestForm
    //   }).then((response) => {
    //     const dataResponseText = response.text();
    //     console.log(dataResponseText, 'dataResponseText RenderTable')
    //     return dataResponseText;
    //   }).then((data) => {
    //   let result = convert.xml2json(data, {compact: false});
    //   let parseData = JSON.parse(result)
    //   console.log(parseData, 'pagination')
    //   const { elements } = parseData
    //   // console.log('target arr', elements[0].elements)
    //   // const elements = elements[0].elements
    //   inSetState({...inState, elements:[...elements[0].elements]})
    // }).catch((e) => {
    //   console.log(e)
    // })
    
  }
  let count = offsetRenderMap;
  if (loadingComplite) {
  let renderElements = elements.slice(count, count + renderCountItems);  
  return (
    
    <div className="d-flex row flex-wrap justify-content-around">
      <div>
      <Pagination 
        onChange={handlPagination}
        defaultPageSize={20}
        defaultCurrent={1}
        showSizeChanger={false}
        total={elements.length} 
        style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
      </div>
      
      {/* renderBar */}
      {renderElements.map((item) => {
        // console.log('all arr?')
        // if(count < renderCountItems) {
          // count = count + 1;
        // count = count + 1;
        console.log(count, renderCountItems, offset)
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
      <Pagination 
        onChange={handlPagination}
        defaultPageSize={20}
        showSizeChanger={false}
        defaultCurrent={1} 
        total={elements.length} 
        style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
      </div>
    </div>
  )
  } else {
    return (
      <div>Loading</div>
    )
  }
}
