/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import '../Styles/searchBar.css'
import DatePicker1 from '../datePikers/DatePicker1';
import DatePicker2 from '../datePikers/DatePicker1';


export default function SearchBar() {

  // function range(start, end) {
  //   const result = [];
  //   for (let i = start; i < end; i++) {
  //     result.push(i);
  //   }
  //   return result;
  // }

  // function disabledDate(current) {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // }
  
  // function disabledDateTime() {
  //   return {
  //     disabledHours: () => range(0, 24).splice(4, 20),
  //     disabledMinutes: () => range(30, 60),
  //     disabledSeconds: () => [55, 56],
  //   };
  // }
  // const onChange = (e) => {
  //   let formDateDay = e._d;
  //   let formDateHours = e._d;
  //   const resultDate = formDateDay.toISOString().substring(0, 10) + " " + formDateHours.toISOString().substring(11, 19)
  //   // YYYY-MM-DD HH::mm::ss
  //   console.log(resultDate)
  // }
  const changeCamera = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="row">
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Группа камер</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={"не выбранно"} onChange={changeCamera}>
          <option value="0">не выбранно</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Камера</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Событие</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Обьект</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>Уверенность</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <DatePicker1 />
      <DatePicker2 />
      {/* <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
      <label>Дата и время (от)</label>
      
        <DatePicker
          style={{display: "flex"}}
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      
      </div>

      <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
      <label>Дата и время (до)</label>
      
        <DatePicker
          style={{display: "flex"}}
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      
      </div> */}

      <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
      <button type="button" className="btn btn-outline-primary btn-sm">Применить</button>
      </div>
      
    </div>
  )
}
