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

  // let targetCalendar = `${name}` + `${toggleActivePage}`
  const mappingValueCalendar = {
    'From': toggleActivePage === 'report' ? globalState.fetch.report.searchStartDateReport : globalState.fetch.chart.searchStartDateChart,
    'To': toggleActivePage === 'report' ? globalState.fetch.report.searchEndDateReport : globalState.fetch.chart.searchEndDateChart
  }

  // useEffect(() => {
  //   setState({value: formatDateToLocale(new Date(mappingValueCalendar[name]()))})
  // }, []);
  
  const defaultPeriod = (period, format) => {
    if(typeof period !== "number") {
      period = Number(period)
    }
    let d = new Date(); // today!
    d.setDate(d.getDate() - period);
    let result = formatDateToLocale(d, format)
    // console.log(formatDateToLocale(new Date(globalState.fetch.report.searchStartDateReport), 'dd:mm:yyyy hh:MM:ss'), 'asda')
    return result;
  }
  

  let { fetch } = globalState;
  let { chart, report } = globalState.fetch
  const disabledDate = (current) => {
    // eslint-disable-next-line no-mixed-operators
    const dayPlusOne = new Date(maxDate)
    const day = dayPlusOne.setDate(dayPlusOne.getDate() + 1)
    const min = formatDateToLocale(new Date(minDate), 'yyyy-mm-dd', 0)
    const max = formatDateToLocale(new Date(day), 'yyyy-mm-dd', 0)
    // eslint-disable-next-line no-mixed-operators
    return current < moment(min) || current && current > moment(max);
  }

  const onChange = (e, f = null) => {
    // console.log(e, f)
    let d = new Date(e._d)
    
    const resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0)
    // console.log( resultDate , " resultDate ")
    if (name === 'From' && toggleActivePage === 'report') {
      report = { ...report, searchStartDateReport: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'To' && toggleActivePage === 'report') {
      report = { ...report, searchEndDateReport: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'From' && toggleActivePage === 'chart') {
      chart = { ...chart, searchStartDateChart: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
    if (name === 'To' && toggleActivePage === 'chart') {
      chart = { ...chart, searchEndDateChart: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
  }
  let targetDateMapping = mappingValueCalendar[name]
  // console.log(targetDateMapping, 'targetDateMapping')
  let testDate = moment(targetDateMapping, 'YYYY-MM-DD HH:mm:ss')
  // console.log(formatDateToLocale(testDate), 'formatDateToLocale')
  return (
    <div className="col-sm-4 col-lg-3 col-xl-2 pb-3 button_max_width">
      <label className="pb-1">{labelName}</label>
      <DatePicker
        allowClear={false}
        style={{ display: "flex" }}
        locale={locale}
        format="DD.MM.YYYY HH:mm:ss"
        // onChange={onChange}
        disabledDate={disabledDate}
        // disabledDate={disabledDate2}
        // disabledTime={disabledDateTime}
        // defaultValue={moment(minDate, dateFormat)}
        showTime={true}
        // open={state.toggleActivePage}
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