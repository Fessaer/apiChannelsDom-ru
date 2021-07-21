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
console.log(targetItem, settings)

  useEffect(() => {
    if (targetItem !== undefined) {
      form.setFieldsValue({
        startDate:
          moment(formatDateToLocale(new Date(), 'YYYY.MM.DD HH:mm:ss'), 'YYYY.MM.DD HH:mm:ss'),
      });
      form.setFieldsValue({
        endDate:
          moment(formatDateToLocale(new Date(), 'YYYY.MM.DD HH:mm:ss'), 'YYYY.MM.DD HH:mm:ss'),
      });
    }
  }, []);

  const onValuesHandle = (changedValues) => {
    console.log(form)
    const keyChangeValue = Object.keys(changedValues)[0];
    const dateMapping = {
      startDate: changedValues[keyChangeValue],
      endDate: changedValues[keyChangeValue],
    };
    
    console.log(keyChangeValue, 'keyChangeValue')

    let d = new Date(dateMapping[keyChangeValue]._d);
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0);

    inSetState({...globalState, [keyChangeValue]: resultDate})
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
              allowClear={false}
              style={{ display: 'flex', width: 200 }}
              locale={locale}
              format="DD.MM.YYYY HH:mm:ss"
              showTime={true}
              showNow={false}
              showToday={true}
              inputReadOnly={true}
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
        <label>Дата и время (от)</label>
        <DatePicker
          allowClear={false}
          style={{ display: 'flex', width: 200 }}
          locale={locale}
          format="DD.MM.YYYY HH:mm:ss"
          showTime={true}
          showNow={false}
          showToday={true}
          inputReadOnly={true}
        />
</div>
</Col>
</>
  );
};
export default FormComponent;