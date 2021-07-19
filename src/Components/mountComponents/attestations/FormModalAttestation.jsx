import React, { useContext, useEffect } from 'react';
import { Context } from '../../Store';
import { Form, DatePicker } from 'antd';
import locale from '../../config/locale/date_picker/ru/date_picker_ru_RU';
import formatDateToLocale from '../../helpers/functionFormatReplaceDate';
import moment from 'moment';

const config = {
  rules: [
    {
      type: 'object',
      required: true,
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

const FormSetAttestation = ({ targetItem }) => {
  const [globalState, inSetState] = useContext(Context);
  let { fetch } = globalState;
  let { attestations } = globalState.fetch;
  const [form] = Form.useForm();

  useEffect(() => {
    if (targetItem !== undefined) {
      form.setFieldsValue({
        'date-picker1': moment(
          targetItem.EntryFirstDate,
          'YYYY.MM.DD HH:mm:ss'
        ),
      });
      form.setFieldsValue({
        'date-picker2': moment(targetItem.EntryLastDate, 'YYYY.MM.DD HH:mm:ss'),
      });

      inSetState({
        ...globalState,
        fetch: {
          ...fetch,
          attestations: {
            ...attestations,
            EntryLastDate: targetItem.EntryLastDate,
            EntryFirstDate: targetItem.EntryFirstDate,
          },
        },
      });
    }
  }, []);

  const onValuesHandle = (changedValues) => {
    const keyChangeValue = Object.keys(changedValues)[0];
    const dateMapping = {
      'date-picker1': changedValues[keyChangeValue],
      'date-picker2': changedValues[keyChangeValue],
    };

    let d = new Date(dateMapping[keyChangeValue]._d);
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0);
    if (keyChangeValue === 'date-picker1') {
      fetch = {
        ...fetch,
        attestations: {
          ...attestations,
          EntryFirstDate: resultDate,
        },
      };
    }
    if (keyChangeValue === 'date-picker2') {
      fetch = {
        ...fetch,
        attestations: {
          ...attestations,
          EntryLastDate: resultDate,
        },
      };
    }
    inSetState({ ...globalState, fetch });
  };

  return (
    <Form
      name="time_related_controls"
      {...formItemLayout}
      onValuesChange={onValuesHandle}
      form={form}
    >
      <Form.Item name="date-picker1" label="Дата и время (от)" {...config}>
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
      <Form.Item name="date-picker2" label="Дата и время (до)" {...config}>
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
export default FormSetAttestation;
