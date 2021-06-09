import React, { useContext, useState, useEffect } from 'react';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import { Context } from '../Store';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';


export default function DatePicker1() {
  const [inState, inSetState] = useContext(Context);

  let{ searchStartDate } = inState;


  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    // console.log(formatDateToLocale(new Date(), 'hh', 0), 'form')
    return current && current > moment().endOf('day');
  }
  
  // function disabledDateTime() {
  //   return {
  //     disabledHours: () => range(formatDateToLocale(new Date(), 'hh', 0), 24),
  //     disabledMinutes: () => range(formatDateToLocale(new Date(), 'MM', 0), 60),
  //     disabledSeconds: () => range(formatDateToLocale(new Date(), 'ss', 0), 60),
  //   };
  // }
  const onChange = (e) => {
    console.log(e)
    let formDateDay = e._d;
    let formDateHours = e._d;
    let d = new Date(e._d)
    let hours = d.getHours().toString()
    console.log(hours.length, 'length hours')
    if (hours.length < 2) {
      hours = 0 + hours
    }
    const resultDate = formDateDay.toISOString().substring(0, 10) + " " + hours + formDateHours.toISOString().substring(13, 19)
    // YYYY-MM-DD HH::mm::ss
    searchStartDate = resultDate
    inSetState({...inState, searchStartDate})
    console.log(resultDate)
  }
  const onTest = (e) => {
    console.log(e)
  }

  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
      <label>Дата и время (от)</label>
      
        <DatePicker
          style={{display: "flex"}}
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          input={onTest}
        />
      
      </div>
  )
}
