/* eslint-disable no-mixed-operators */
import React, { useContext } from 'react';
import { Col } from 'antd';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import { Context } from '../Store';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import locale from '../config/locale/date_picker/ru/date_picker_ru_RU';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;

const style = { display: 'flex', flexDirection: 'column', maxWidth: 220};

function CalendarPicker(props) {
  const [globalState, inSetState] = useContext(Context);
  let { minDate, maxDate, configs } = props;
  const { toggleActivePage } = globalState;
  const { type, periodAgo } = configs;
  const mappingValueCalendar = {
    'From': toggleActivePage === 'report' ? globalState.fetch.report.From : globalState.fetch.chart.From,
    'To': toggleActivePage === 'report' ? globalState.fetch.report.To : globalState.fetch.chart.To
  }

  const defaultPeriod = (periodAgo, format) => {
    if(typeof periodAgo !== "number") {
      periodAgo = Number(periodAgo)
    }
    let d = new Date(); // today!
    d.setDate(d.getDate() - periodAgo);
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
    
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0)

    if (type === 'From' && toggleActivePage === 'report') {
      report = { ...report, From: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (type === 'To' && toggleActivePage === 'report') {
      report = { ...report, To: resultDate }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch })
    }
    if (type === 'From' && toggleActivePage === 'chart') {
      chart = { ...chart, From: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
    if (type === 'To' && toggleActivePage === 'chart') {
      chart = { ...chart, To: resultDate }
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch })
    }
  }
  let targetDateMapping = mappingValueCalendar[type]
  let testDate = moment(targetDateMapping, 'YYYY-MM-DD HH:mm:ss')
  return (
    <Col className="gutter-row" sm={{ span: 6, push: 0}} xl={{ span: 4, push: 0}} style={style}>
      <label className="pb-1">{configs.label}</label>
      <DatePicker
        allowClear={false}
        style={{ display: "flex", width: 200 }}
        locale={locale}
        format="DD.MM.YYYY HH:mm:ss"
        disabledDate={disabledDate}
        showTime={true}
        defaultValue={moment(defaultPeriod(periodAgo, 'dd:mm:yyyy'), 'DD:MM:YYYY')}
        value={ moment(formatDateToLocale(new Date(testDate)), 'YYYY-MM-DD HH:mm:ss') }
        showNow={false}
        onSelect={onChange}
        showToday={true}
        inputReadOnly={true}
      />
    </Col>
  )
}

export default CalendarPicker;