/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBar';
import RenderTable from '../RenderTable';
var convert = require('xml-js');

export default function Home() {
  const [inState, inSetState] = useContext(Context);
  // const [offsetState, setOffsetState] = useState({offset: 0});
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  
  // let { offset } = offsetState
  let { count } = inState;
  const defaultParamFetch = {

  }
  const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  const requestForm = new FormData()
  // ChangePasswordAtNextLogin
  // SessionID
  const { startDate } = inState;
  const { endDate } = inState;
  let { offset } = inState;
  const { SessionID } = inState;
  const { ChangePasswordAtNextLogin } = inState;
  // console.log(inState, 'inState users')
  // console.log(SessionID, ChangePasswordAtNextLogin)
  requestForm.set('SessionID', SessionID)
  requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  requestForm.set('Analytics', 'TPlusCoveralls')
  requestForm.set('From', `${startDate.toISOString().substring(0, 10) + ' 00:00:00'}`)
  requestForm.set('To', `${endDate.toISOString().substring(0, 10) + ' 23:30:10'}`)
  requestForm.set('Offset', offset)
  requestForm.set('Limit', 20)
  requestForm.set('TPlusCoveralls[ClassID]', '3')
  requestForm.set('TPlusCoveralls[EventSubjectID]', '553')
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
    // console.log(parseData, 'parse data')
    const { elements } = parseData
    // console.log('target arr', elements[0].elements)
    // const elements = elements[0].elements
    const { loadingComplite } = inState;
    inSetState({...inState, elements:[...elements[0].elements], loadingComplite: true})
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
