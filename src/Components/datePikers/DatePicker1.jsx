import React from 'react'
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';


export default function DatePicker1() {
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  const onChange = (e) => {
    let formDateDay = e._d;
    let formDateHours = e._d;
    const resultDate = formDateDay.toISOString().substring(0, 10) + " " + formDateHours.toISOString().substring(11, 19)
    // YYYY-MM-DD HH::mm::ss
    console.log(resultDate)
  }

  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
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
  )
}
