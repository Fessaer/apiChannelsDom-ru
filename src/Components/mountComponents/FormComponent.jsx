import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { Form, DatePicker } from 'antd';
import locale from './config/locale/date_picker/ru/date_picker_ru_RU';
import formatDateToLocale from './helpers/functionFormatReplaceDate';
import moment from 'moment';

const config = {
  rules: [
    {
      type: 'object',
      message: 'Please select time!',
    },
  ],
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
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
    <Form
      layout="inline"
      name="time_related_controls"
      {...formItemLayout}
      onValuesChange={onValuesHandle}
      form={form}
    >
      <Form.Item
        name={'startDate'}
        label={'startDate'}
        {...config}
      >
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
      </Form.Item>
      <Form.Item
        name={'endDate'}
        label={'endDate'}
        {...config}
      >
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
      </Form.Item>
    </Form>
  );
};
export default FormComponent;