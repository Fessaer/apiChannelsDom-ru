/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
// import '../Styles/searchBar.css'
import DatePicker1 from '../datePikers/DatePicker1';
import DatePicker2 from '../datePikers/DatePicker2';
import DropdownList from '../mountСomponents/DropdownList';
import Calendar from '../mountСomponents/CalendarDatePicker';
import Submit from '../mountСomponents/Submit';
import Paginations from '../mountСomponents/Paging';
import fetchFunc from '../helpers/fetchFunction';
// import DataTable from '../mountСomponents/DataPlate';
var convert = require('xml-js');




export default function SearchBar(props) {
  const [globalState, inSetState] = useContext(Context);
  const { searchStartDate,
    searchEndDate,
    elements, 
    SessionID, 
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    ClassID,
    offset,
    loadingSpinner } = globalState;
    // const { loadingSpinner } = globalState;
  let { noRenderPagination } = globalState;
  
  // const handleSearch = (toggleString) => async(e, f) => {
  //   console.log(props, 'props search bar')
  //   console.log(toggleString, 'toggleString', e, f, 'event')
  //   inSetState({...globalState, loadingSpinner: true})
  //   const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  //   const requestForm = new FormData()
  //   requestForm.set('SessionID', SessionID)
  //   requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  //   requestForm.set('Analytics', 'TPlusCoveralls')
  //   requestForm.set('From', `${searchStartDate}`)
  //   requestForm.set('To', `${searchEndDate}`)
  //   if(toggleString ==='paging') { 
  //     requestForm.set('Offset', offset) 
  //   } else {
  //     requestForm.set('Offset', 0) 
  //   }
  //   if(toggleString !== 'chart') requestForm.set('Limit', 21)
  //   if(toggleString !== 'chart') requestForm.set('TPlusCoveralls[ClassID]', ClassID)
  //   if(toggleString !== 'chart') requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
  //   if(toggleString === 'chart') requestForm.set('CountBy', 'day')
  //   // if (new Date(searchStartDate) < new Date(searchEndDate)) {
  //     if (true) {
  //       console.log('...ЗАПРОС =>>>')
  //       await fetch(apiUrlGetData, {
  //       method: 'POST',
  //       body: requestForm
  //     }).then((response) => {
  //       try {
  //         const dataResponseText = response.text();
  //         console.log(dataResponseText, 'dataResponseText RenderTable')
  //         return dataResponseText;
  //     } catch (err) {
  //         console.log(err, 'err')
  //         inSetState({...globalState, loadingSpinner: false, noRenderPagination: true, elements:[]})
  //       // обработка ошибки
  //     }
        
  //     }).then((data) => {
  //       try {
  //         let result = convert.xml2json(data, {compact: false});
  //         let parseData = JSON.parse(result)
  //         console.log(parseData, 'pagination')
  //         const { elements } = parseData
  //         if (typeof elements[0]['elements'] !== "undefined") {
  //           if (elements[0].elements.length < 21) {
  //             noRenderPagination = true
  //           } else {
  //             noRenderPagination = false
  //           }
  //           inSetState({...globalState, elements:[...elements[0].elements], activePage: 1, lengthPagination: 0, noRenderPagination, loadingComplite: true, loadingSpinner: false})
  //         }
  //         if (typeof elements[0]['elements'] === "undefined") {
  //           inSetState({...globalState, elements:[], activePage: 1, lengthPagination: 0})
  //         }
  //       } catch (err) {
  //           console.log(err, 'err2', elements in elements)
  //           inSetState({...globalState, noRenderPagination: true, elements:[]})
  //     // обработка ошибки
  //     }
  //   }).catch((e) => {
  //       console.log(e)
  //       inSetState({...globalState, loadingSpinner: false, noRenderPagination: true, elements:[]})
  //   })
  //   } else {
  //     console.log('отмена запроса из за некоректной даты')
  //     inSetState({...globalState, loadingSpinner: false, noRenderPagination: true, elements:[]})
  //   }
  // }
  const handleTest = async () => {
    // const dataFetch = await fetchFunc(globalState)
    console.log(globalState, 'globalState')
    // await console.log(dataFetch, 'dataFetch')
    // await inSetState({...globalState, elements: [...dataFetch]})
  }
  return (
      <form>
        <div className="row">
          <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'Камера'} />
          <Calendar name={'From'} labelName={'Дата и время (от)'}/>
          <Calendar name={'To'} labelName={'Дата и время (до)'}/>
          <DropdownList name={'ClassID'} items={[{1:'Каска'}, {2: 'Куртка'}, {3: 'Штаны'}, {4: 'Всё'}]} labelName={'Класс объекта'} />
          <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} />
          <Submit handleSearch={() => props.fetchFunction()}/>
          {/* <DataTable /> */}

          <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
          {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button> */}
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleTest}>Check</button>
        </div>
      </div>
    </form>
  )
}
