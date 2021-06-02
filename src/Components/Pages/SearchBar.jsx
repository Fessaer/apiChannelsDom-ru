import React from 'react';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

export default function SearchBar() {

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  const onChange = (e) => {
    let formDateDay = e._d;
    let formDateHours = e._d;
    const resultDate = formDateDay.toISOString().substring(0, 10) + " " + formDateHours.toISOString().substring(11, 19)
    // YYYY-MM-DD HH::mm::ss
    console.log(resultDate)
  }

  return (
    <div className="row">
      <div className="col-lg-2 pb-3">
        <label>Группа камер</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 pb-3">
        <label>Камера</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 pb-3">
        <label>Событие</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 pb-3">
        <label>Обьект</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="col-lg-2 pb-3">
        <label>Уверенность</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div className="col-lg-2 pb-3">
      <label>Дата и время (от)</label>
      <Space direction="vertical" size={12}>
        <DatePicker
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      </Space>
      </div>

      <div className="col-lg-2 pb-3">
      <label>Дата и время (до)</label>
      <Space direction="vertical" size={12}>
        <DatePicker
          locale={locale}
          format="DD-MM-YYYY HH:mm:ss"
          onChange={onChange}
          // disabledDate={disabledDate}
          // disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      </Space>
      </div>

      <div className="col-lg-2 pb-3 d-flex align-items-end">
      <button type="button" class="btn btn-outline-primary btn-sm">Применить</button>
      </div>
    </div>
  )
}
