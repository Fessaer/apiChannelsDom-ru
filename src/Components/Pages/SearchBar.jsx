/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';

import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import '../Styles/searchBar.css'
import DatePicker1 from '../datePikers/DatePicker1';
import DatePicker2 from '../datePikers/DatePicker2';
var convert = require('xml-js');



export default function SearchBar() {
  const [inState, inSetState] = useContext(Context);
  // console.log(inState, 'RenderTable')
  const { elements } = inState;
  const { loadingComplite } = inState;
  const { searchStartDate, searchEndDate } = inState;
  // const { searchEndDate } = inState;
  let { offset } = inState;
  const { SessionID, ChangePasswordAtNextLogin } = inState;
  const { eventSubjectID, classID } = inState;

  const handlerEventSubjectID = (e) => {
    // console.log(eventSubjectID)
    inSetState({...inState, eventSubjectID: e.target.value})
    // console.log(e.target.value)
  }
  const handlerClassID = (e) => {
    // console.log(classID)
    inSetState({...inState, classID: e.target.value})

  }

  const handlSearch = async (e) => {
    console.log(typeof e)
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    const requestForm = new FormData()
    // const newOffSet = (e - 1) * 20
    // console.log(newOffSet)
    // offset = newOffSet;
    // inSetState({...inState, offset})
  // ChangePasswordAtNextLogin
  // SessionID
    
    // console.log(inState, 'inState users')
  console.log(searchStartDate,searchEndDate, 'fetch data')
    requestForm.set('SessionID', SessionID)
    requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
    requestForm.set('Analytics', 'TPlusCoveralls')
    requestForm.set('From', `${searchStartDate}`)
    requestForm.set('To', `${searchEndDate}`)
    requestForm.set('Offset', offset)
    // requestForm.set('Limit', 20)
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
  
  const changeCamera = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="row">
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Группа камер</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={"не выбранно"} onChange={changeCamera}>
          <option value="0">не выбранно</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Камера</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">Спецодежда VLC stream</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Событие</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handlerEventSubjectID}>
          {/* <option selected>Open this select menu</option> */}
          <option value="552">Нестандартная спецодежда</option>
          <option value="553">Стандартная спецодежда</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Обьект</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handlerClassID}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">Голова</option>
          <option value="2">Туловище</option>
          <option value="3">Ноги</option>
        </select>
      </div>

      <DatePicker1 />
      <DatePicker2 />

      <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button>
      </div>
      
    </div>
  )
}
