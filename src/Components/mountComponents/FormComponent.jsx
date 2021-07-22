import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { Form, DatePicker, Row, Col } from 'antd';
import locale from './config/locale/date_picker/ru/date_picker_ru_RU';
import formatDateToLocale from './helpers/functionFormatReplaceDate';
import moment from 'moment';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  maxWidth: 220,
};

const FormComponent = ({ targetItem, settings }) => {
  const [globalState, inSetState] = useContext(Context);
  const [form] = Form.useForm();

  let dateDefaultOnePicker1 = new Date();
  let dateDefaultOnePicker2 = new Date();
  dateDefaultOnePicker2.setHours(dateDefaultOnePicker1.getHours() - 4);

  let dateDefaultTwoPicker1 = new Date();
  let dateDefaultTwoPicker2 = new Date();
  dateDefaultTwoPicker2.setHours(dateDefaultTwoPicker1.getHours() + 4);

  useEffect(() => {
    const resultDateStart = formatDateToLocale(dateDefaultOnePicker2, 'dd-mm-yyyy hh:MM:ss', 0);
    const resultDateEnd = formatDateToLocale(dateDefaultTwoPicker2, 'dd-mm-yyyy hh:MM:ss', 0);
    inSetState({...globalState, startDate: resultDateStart, endDate: resultDateEnd})
  }, []);

  const handleSecondPicker = (e) => {
    let d = new Date(e._d);
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0);
    inSetState({...globalState, endDate: resultDate})
  };

  const handleFirstPicker = (e) => {
    let d = new Date(e._d);
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0);
    inSetState({...globalState, startDate: resultDate})
  };

  return (
    <>
      <Col
        className="gutter-row"
        sm={{ span: 6, push: 0 }}
        xl={{ span: 4, push: 0 }}
        style={style}
      >
      <div>
        <label>Дата и время (от)</label>
          <DatePicker
            defaultValue={moment(formatDateToLocale(dateDefaultOnePicker2, 'dd-mm-yyyy hh:MM:ss', 0), "DD.MM.YYYY HH:mm:ss")}
            allowClear={false}
            style={{ display: 'flex', width: 200 }}
            locale={locale}
            format="DD.MM.YYYY HH:mm:ss"
            showTime={true}
            showNow={false}
            showToday={true}
            inputReadOnly={true}
            onSelect={handleFirstPicker}
          />
      </div>
      </Col>
      <Col
        className="gutter-row"
        sm={{ span: 6, push: 0 }}
        xl={{ span: 4, push: 0 }}
        style={style}
      >
        <div>
          <label>Дата и время (до)</label>
          <DatePicker
            defaultValue={moment(formatDateToLocale(dateDefaultTwoPicker2, 'dd-mm-yyyy hh:MM:ss', 0), "DD.MM.YYYY HH:mm:ss")}
            allowClear={false}
            style={{ display: 'flex', width: 200 }}
            locale={locale}
            format="DD.MM.YYYY HH:mm:ss"
            showTime={true}
            showNow={false}
            showToday={true}
            inputReadOnly={true}
            onSelect={handleSecondPicker}
          />
        </div>
      </Col>
    </>
  );
};
export default FormComponent;