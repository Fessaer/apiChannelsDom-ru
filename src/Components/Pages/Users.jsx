/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBar';
import RenderTable from '../RenderTable';
var convert = require('xml-js');

export default function Home() {
  const [inState, inSetState] = useContext(Context);
  let { count } = inState;
  const defaultParamFetch = {
  }
  const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  const requestForm = new FormData()
  const { startDate } = inState;
  const { endDate } = inState;
  let { offset, noRenderPagination } = inState;
  const { SessionID } = inState;
  const { ChangePasswordAtNextLogin } = inState;
  requestForm.set('SessionID', SessionID)
  requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  requestForm.set('Analytics', 'TPlusCoveralls')
  requestForm.set('From', `${startDate.toISOString().substring(0, 10) + ' 00:00:00'}`)
  requestForm.set('To', `${endDate.toISOString().substring(0, 10) + ' 23:30:10'}`)
  requestForm.set('Offset', offset)
  requestForm.set('Limit', 21)
  requestForm.set('TPlusCoveralls[ClassID]', '1')
  requestForm.set('TPlusCoveralls[EventSubjectID]', '552')
  useEffect(() => {
    (async function () {
    return await fetch(apiUrlGetData, {
      method: 'POST',
      body: requestForm
    }).then((response) => {
      const dataResponseText = response.text();
      console.log(dataResponseText, 'dataResponseText')
      return dataResponseText;
    }).then((data) => {
    let result = convert.xml2json(data, {compact: false});
    let parseData = JSON.parse(result)
    let { elements } = parseData
    
    if (elements[0].elements.length < 21) {
      noRenderPagination = true
      inSetState({...inState, elements:[...elements[0].elements], loadingComplite: true, noRenderPagination})
    } else {
      noRenderPagination = false
      inSetState({...inState, elements:[...elements[0].elements], loadingComplite: true, noRenderPagination})
    }
  }).catch((e) => {
    console.log(e)
  })
  })()
}, [])
// console.log(inState, 'State USers')
  return (
    <div className="container-fluid"> 
    сонтайнер Bootstrap
    <SearchBar />
    <RenderTable />
    </div>
  )
}
