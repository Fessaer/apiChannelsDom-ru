/* eslint-disable no-mixed-operators */
import React, { useContext } from 'react';

import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import { Context } from '../Store';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
// import locale from 'antd/es/date-picker/locale/ru_RU';
import locale from '../config/locale/date_picker/ru/date_picker_ru_RU';
import moment from 'moment';
import '../Styles/CalendarDatePicker.css'
// const enhanceWithClickOutside = require('react-click-outside');
moment.suppressDeprecationWarnings = true;

function CalendarPicker(props) {
  const [globalState, inSetState] = useContext(Context);
  let { name, minDate, maxDate, labelName, period } = props;
  const { toggleActivePage } = globalState;

  const mappingValueCalendar = {
    'From': toggleActivePage === 'report' ? globalState.fetch.report.From : globalState.fetch.chart.From,
    'To': toggleActivePage === 'report' ? globalState.fetch.report.To : globalState.fetch.chart.To
  }

  const defaultPeriod = (period, format) => {
    if(typeof period !== "number") {
      period = Number(period)
    }
    let d = new Date(); // today!
    d.setDate(d.getDate() - period);
    let result = formatDateToLocale(d, format)
    return result;
  }
  

  let { fetch } = globalState;
  let { chart, report } = globalState.fetch
  const disabledDate = (current) => {
    const dayPlusOne = new Date(maxDate)
    const day = dayPlusOne.setDate(dayPlusOne.getDate() + 1)
    const min = formatDateToLocale(new Date(minDate), 'yyyy-mm-dd', 0)
    const max = formatDateToLocale(new Date(day), 'yyyy-mm-dd', 0)
    return current < moment(min) || current && current > moment(max);
  }

  const onChange = (e, f = null) => {
    let d = new Date(e._d)
    
    const resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0)

    if (name === 'From' && toggleActivePage === 'report') {
      report = { ...report, From: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'To' && toggleActivePage === 'report') {
      report = { ...report, To: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'From' && toggleActivePage === 'chart') {
      chart = { ...chart, From: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'To' && toggleActivePage === 'chart') {
      chart = { ...chart, To: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
  }
  let targetDateMapping = mappingValueCalendar[name]
  let testDate = moment(targetDateMapping, 'YYYY-MM-DD HH:mm:ss')
  return (
    <div className="col-sm-4 col-lg-3 col-xl-2 pb-3 button_max_width">
      <label className="pb-1">{labelName}</label>
      <DatePicker
        allowClear={false}
        style={{ display: "flex" }}
        locale={locale}
        format="DD.MM.YYYY HH:mm:ss"
        disabledDate={disabledDate}
        showTime={true}
        defaultValue={moment(defaultPeriod(period, 'dd:mm:yyyy'), 'DD:MM:YYYY')}
        value={ moment(formatDateToLocale(new Date(testDate)), 'YYYY-MM-DD HH:mm:ss') }
        showNow={false}
        onSelect={onChange}
        showToday={true}
        inputReadOnly={true}
      />
    </div>
  )
}

export default CalendarPicker;
// export default CalendarPicker;