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
import Calendar from '../mountСomponents/CalendarDataPicker';
import Submit from '../mountСomponents/Submit';
import Paginations from '../mountСomponents/Paging';
// import DataTable from '../mountСomponents/DataPlate';
var convert = require('xml-js');




export default function SearchBar(props) {
  const [inState, inSetState] = useContext(Context);
  // const { Submit } = props
  const handlCheck = () => {
    
    console.log(props)
  }

  return (
    <div className="row">
      <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'камера'} />
      <Calendar name={'From'} labelName={'Дата и время (от)'}/>
      <Calendar name={'To'} labelName={'Дата и время (до)'}/>
      <DropdownList name={'ClassID'} items={[{1:'Голова'}, {2: 'Туловище'}, {3: 'Ноги'}]} labelName={'класс объекта'} />
      <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} />
      <Submit />
      {/* <DataTable /> */}

      {/* <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlCheck}>Check</button>
      </div> */}
    </div>
  )
}
