import React, { useContext, useEffect } from 'react';
import { Context } from '../../Store';
import { Form, DatePicker } from 'antd';
import locale from '../../config/locale/date_picker/ru/date_picker_ru_RU';

const DatePicker = () => {
  const [globalState, inSetState] = useContext(Context);
  const [form] = Form.useForm();

  return (
    <Col
      className="gutter-row"
      sm={{ span: 6, push: 0 }}
      xl={{ span: 4, push: 0 }}
      style={style}
    >
      <label></label>
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
      </Col>
      )
};
export default DatePicker;