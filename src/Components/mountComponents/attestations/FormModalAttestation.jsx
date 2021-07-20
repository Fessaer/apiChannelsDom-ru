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

const FormModalAttestation = ({ targetItem, settings }) => {
  const [globalState, inSetState] = useContext(Context);
  let { fetch } = globalState;
  let { attestations } = globalState.fetch;
  const [form] = Form.useForm();
  console.log(settings);
  useEffect(() => {
    if (targetItem !== undefined) {
      form.setFieldsValue({
        [settings.componentAttestations.EntryFirstDate.formElementProps.type]:
          moment(targetItem.EntryFirstDate, 'YYYY.MM.DD HH:mm:ss'),
      });
      form.setFieldsValue({
        [settings.componentAttestations.EntryLastDate.formElementProps.type]:
          moment(targetItem.EntryLastDate, 'YYYY.MM.DD HH:mm:ss'),
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
      [settings.componentAttestations.EntryFirstDate.formElementProps.type]:
        changedValues[keyChangeValue],
      [settings.componentAttestations.EntryLastDate.formElementProps.type]:
        changedValues[keyChangeValue],
    };

    let d = new Date(dateMapping[keyChangeValue]._d);
    let resultDate = formatDateToLocale(d, 'yyyy-mm-dd hh:MM:ss', 0);
    if (
      keyChangeValue ===
      settings.componentAttestations.EntryFirstDate.formElementProps.type
    ) {
      fetch = {
        ...fetch,
        attestations: {
          ...attestations,
          EntryFirstDate: resultDate,
        },
      };
    }
    if (
      keyChangeValue ===
      settings.componentAttestations.EntryLastDate.formElementProps.type
    ) {
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
      <Form.Item
        name={
          settings.componentAttestations.EntryFirstDate.formElementProps.type
        }
        label={
          settings.componentAttestations.EntryFirstDate.formElementProps.label
        }
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
        name={
          settings.componentAttestations.EntryLastDate.formElementProps.type
        }
        label={
          settings.componentAttestations.EntryLastDate.formElementProps.label
        }
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
export default FormModalAttestation;
