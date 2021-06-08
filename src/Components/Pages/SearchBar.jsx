/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';
import formatDateToLocale from '../functionFormatReplaceDate'
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import '../Styles/searchBar.css'
import DatePicker1 from '../datePikers/DatePicker1';
import DatePicker2 from '../datePikers/DatePicker2';
import DropdownList from '../mountСomponents/DropdownList';
import Calendar from '../mountСomponents/CalendarDataPicker';
import Submit from '../mountСomponents/Submit';
import Paginations from '../mountСomponents/Paging';
// import DataTable from '../mountСomponents/DataPlate';
var convert = require('xml-js');




export default function SearchBar() {
  const [inState, inSetState] = useContext(Context);
  // console.log(inState, 'RenderTable')
  // const { elements } = inState;
  // const { loadingComplite } = inState;
  // const { searchStartDate, searchEndDate } = inState;
  // // const { searchEndDate } = inState;
  // let { offset, noRenderPagination } = inState;
  // const { SessionID, ChangePasswordAtNextLogin } = inState;
  // const { eventSubjectID, classID } = inState;

  // const handlerEventSubjectID = (e) => {
  //   // console.log(eventSubjectID)
  //   inSetState({...inState, eventSubjectID: e.target.value})
  //   // console.log(e.target.value)
  // }
  // const handlerClassID = (e) => {
  //   // console.log(classID)
  //   inSetState({...inState, classID: e.target.value})

  // }

  // const handlSearch = async (e) => {
  //   const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  //   const requestForm = new FormData()
  //   requestForm.set('SessionID', SessionID)
  //   requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  //   requestForm.set('Analytics', 'TPlusCoveralls')
  //   requestForm.set('From', `${searchStartDate}`)
  //   requestForm.set('To', `${searchEndDate}`)
  //   requestForm.set('Offset', 0)
  //   requestForm.set('Limit', 21)
  //   requestForm.set('TPlusCoveralls[ClassID]', classID)
  //   requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
  //   if (new Date(searchStartDate) < new Date(searchEndDate) && new Date() > new Date(searchEndDate) && new Date() > new Date(searchStartDate)) {
  //     console.log('...ЗАПРОС =>>>')
  //     await fetch(apiUrlGetData, {
  //       method: 'POST',
  //       body: requestForm
  //     }).then((response) => {
  //       try {
  //       const dataResponseText = response.text();
  //       console.log(dataResponseText, 'dataResponseText RenderTable')
  //       return dataResponseText;
  //     } catch (err) {
  //       console.log(err, 'err')
  //       // обработка ошибки
  //     }
        
  //     }).then((data) => {
  //       try {
  //     let result = convert.xml2json(data, {compact: false});
  //     let parseData = JSON.parse(result)
  //     console.log(parseData, 'pagination')
  //     const { elements } = parseData
  //     if (typeof elements[0]['elements'] !== "undefined") {
  //       if (elements[0].elements.length < 21) {
  //         noRenderPagination = true
  //       } else {
  //         noRenderPagination = false
  //       }
  //     inSetState({...inState, elements:[...elements[0].elements], activePage: 1, lengthPagination: 0, noRenderPagination})
  //     }
  //     if (typeof elements[0]['elements'] === "undefined") {
  //       inSetState({...inState, elements:[], activePage: 1, lengthPagination: 0})
  //     }
  //   } catch (err) {
  //     console.log(err, 'err2', elements in elements)
  //     // обработка ошибки
  //   }
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  //   } else {
  //     console.log('отмена запроса из за некоректной даты')
  //   }
  // }
  
  // const changeCamera = (e) => {
  //   console.log(e.target.value)
  // }
  const handlCheck = () => {
    console.log(inState)
  }

  return (
    <div className="row">
      {/* <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Группа камер</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={"не выбранно"} onChange={changeCamera}>
          <option value="0">не выбранно</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Камера</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          <option selected>Open this select menu</option>
          <option value="1">Спецодежда VLC stream</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Событие</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handlerEventSubjectID}>
          <option selected>Open this select menu</option>
          <option value="552">Нестандартная спецодежда</option>
          <option value="553">Стандартная спецодежда</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Обьект</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handlerClassID}>
          <option selected>Open this select menu</option>
          <option value="1">Голова</option>
          <option value="2">Туловище</option>
          <option value="3">Ноги</option>
        </select>
      </div> */}

      {/* <DatePicker1 /> */}
      {/* <DatePicker2 /> */}
      
      <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'камера'} />
      <Calendar name={'From'} minDate={'2021-06-04 00:00:00'} maxDate={'2021-06-07 00:00:00'} labelName={'Дата и время (от)'}/>
      <Calendar name={'To'} minDate={'2021-06-04 00:00:00'} maxDate={'2021-06-07 00:00:00'} labelName={'Дата и время (до)'}/>
      <DropdownList name={'ClassID'} items={[{1:'Голова'}, {2: 'Туловище'}, {3: 'Ноги'}]} labelName={'класс объекта'} />
      <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} />
      <Submit />
      <Paginations />
      {/* <DataTable /> */}

      <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
        {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button> */}
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlCheck}>Check</button>
      </div>
    </div>
  )
}
