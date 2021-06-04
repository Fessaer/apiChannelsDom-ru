import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Store';
import './Styles/renderTable.css';
import formatLocaleDate from './formatDate';
import { Pagination } from 'antd';
var _ = require('lodash');
var convert = require('xml-js');

let countPag = 0
export default function RenderTable() {
  const [inState, inSetState] = useContext(Context);
  const [state, setState] = useState({activePage: 1})
  // console.log(inState, 'RenderTable')
  let { elements } = inState;
  const { loadingComplite } = inState;
  const { searchStartDate, searchEndDate } = inState;
  // const { searchEndDate } = inState;
  let { offset } = inState;
  const { SessionID, ChangePasswordAtNextLogin } = inState;
  const { eventSubjectID, classID } = inState;
  // let { offsetRenderMap } = inState;
  let { renderCountItems } = inState;
  // let activePage = 1
  const handlPagination = async (e, f) => {
    console.log(e, 'e => activePage')
    inSetState({...state, activePage: e})
    // activePage = e
    countPag = (e - 1) * 20
    console.log(e, f)
    renderCountItems = f
    const newOffSet = (e - 1) * 20
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    const requestForm = new FormData()
    console.log(newOffSet, 'newOffSet')
    offset = newOffSet;
    inSetState({...inState, offset})
    
    requestForm.set('SessionID', SessionID)
    requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
    requestForm.set('Analytics', 'TPlusCoveralls')
    requestForm.set('From', `${searchStartDate}`)
    requestForm.set('To', `${searchEndDate}`)
    requestForm.set('Offset', countPag)
    requestForm.set('Limit', 20)
    requestForm.set('TPlusCoveralls[ClassID]', classID)
    requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
    
      await fetch(apiUrlGetData, {
        method: 'POST',
        body: requestForm
      }).then((response) => {
        const dataResponseText = response.text();
        console.log(dataResponseText, 'dataResponseText RenderTable')
        return dataResponseText;
      }).then((data) => {
      let result = convert.xml2json(data, {compact: false});
      let parseData = JSON.parse(result)
      console.log(parseData, 'pagination')
      const { elements } = parseData
      // console.log('target arr', elements[0].elements)
      // const elements = elements[0].elements
      inSetState({...inState, elements:[...elements[0].elements]})
      
    }).catch((e) => {
      console.log(e)
    })
    
  }
  let { activePage } = inState; 
  // let count = offsetRenderMap;
  console.log(offset, 'fetch offset')
  console.log(activePage, 'activePage')
  if (loadingComplite) {
  // elements.slice(count, count + renderCountItems)
   
  return (
    
    <div className="d-flex row flex-wrap justify-content-around">
      <div>
      <Pagination
        current={activePage}
        // simple={true}
        // showQuickJumper={true} 
        onChange={handlPagination}
        defaultPageSize={20}
        defaultCurrent={1}
        showSizeChanger={false}
        total={elements.length < 20 ? countPag + 20 : countPag + 30} 
        style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
      </div>
      
      {/* renderBar */}
      {elements.map((item) => {
        // console.log('all arr?')
        // if(count < renderCountItems) {
          // count = count + 1;
        // count = count + 1;
        // console.log(count, renderCountItems, offset)
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
        current={activePage} 
        onChange={handlPagination}
        defaultPageSize={20}
        showSizeChanger={false}
        defaultCurrent={1} 
        total={elements.length < 20 ? countPag + 20 : countPag + 30} 
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
