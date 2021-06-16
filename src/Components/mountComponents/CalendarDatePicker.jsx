import React, { useContext } from 'react';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import { Context } from '../Store';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';
// let cn = require('classnames');


export default function CalendarPicker(props) {
  const [globalState, inSetState] = useContext(Context);
  let { name, minDate, maxDate, labelName } = props;
  const { toggleActivePage } = globalState;
  // console.log(props, 'props')
  // const range = (start, end) => {
  //   const result = [];
  //   for (let i = start; i < end; i++) {
  //     result.push(i);
  //   }
  //   // console.log(result, 'range result')
  //   return result;
  // }
  let { fetch  } = globalState;
  let { chart, report } = globalState.fetch 
  const disabledDate = (current) => {
    // eslint-disable-next-line no-mixed-operators
    const dayPlusOne = new Date(maxDate)
    const day = dayPlusOne.setDate(dayPlusOne.getDate() + 1)
    const min = formatDateToLocale(new Date(minDate), 'yyyy-mm-dd', 0)
    const max = formatDateToLocale(new Date(day), 'yyyy-mm-dd', 0)
    // eslint-disable-next-line no-mixed-operators
    return current  < moment(min) || current && current > moment(max);
  }
 
  // const disabledDateTime = () => {
  //   return {
  //     disabledHours: () => {
  //       if(minDate !== undefined && name === 'From') return range(formatDateToLocale(new Date(minDate), 'hh', 0), 24)
  //       if(maxDate !== undefined && name === 'To') return range(formatDateToLocale(new Date(maxDate), 'hh', 0), 24)
  //     },
  //     disabledMinutes: () => {
  //       if(minDate !== undefined && name === 'From') return range(formatDateToLocale(new Date(minDate), 'MM', 0), 60)
  //       if(maxDate !== undefined && name === 'To') return range(formatDateToLocale(new Date(maxDate), 'MM', 0), 60)
  //     },
  //     disabledSeconds: () => {
  //       if(minDate !== undefined && name === 'From') return range(formatDateToLocale(new Date(minDate), 'ss', 0), 60)
  //       if(maxDate !== undefined && name === 'To') return range(formatDateToLocale(new Date(maxDate), 'ss', 0), 60)
  //     },
  //   };
  // }
  const onChange = (e) => {
    // console.log(e)
    // let formDateDay = e._d;
    // let formDateHours = e._d;
    let d = new Date(e._d)
    // formatDateToLocale()
    // console.log(d, 'day')
    // let hours = d.getHours().toString()
    // console.log(hours.length, 'length hours')
    // if (hours.length < 2) {
    //   hours = 0 + hours
    // }
    // const resultDate = formDateDay.toISOString().substring(0, 10) + " " + hours + formDateHours.toISOString().substring(13, 19)
    // searchStartDate = resultDate
    const resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0)
    if (name === 'From' && toggleActivePage === 'report') {
      report = {...report, searchStartDateReport: resultDate }
      fetch = {...fetch, report}
      inSetState({...globalState, fetch})
    }
    if (name === 'To' && toggleActivePage === 'report') {
      report = {...report, searchEndDateReport: resultDate }
      fetch = {...fetch, report}
      inSetState({...globalState, fetch})
    }
    if (name === 'From' && toggleActivePage === 'chart') {
      chart = {...chart, searchStartDateChart: resultDate }
      fetch = {...fetch, chart}
      inSetState({...globalState, fetch}) 
    }
    if (name === 'To' && toggleActivePage === 'chart') {
      chart = {...chart, searchEndDateChart: resultDate }
      fetch = {...fetch, chart}
      inSetState({...globalState, fetch})
    }
    // console.log(resultDate, 'resultDate')
    // console.log(formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0), 'formatDateToLocale')
  }

  const onTest = (e) => {
    console.log(e, 'onTest')
  }
  // const dateFormat = 'DD-MM-YYYY:HH:mm:ss'
  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
      <label>{labelName}</label>
        <DatePicker
          allowClear={false}
          style={{display: "flex"}}
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          disabledDate={disabledDate}
          // disabledDate={disabledDate2}
          // disabledTime={disabledDateTime}
          // defaultValue={moment(minDate, dateFormat)}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          input={onTest}
          // placeholder={minDate}
        />
      
      </div>
  )
}
