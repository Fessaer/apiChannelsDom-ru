import React from 'react';
import 'moment/locale/ru';
import Calendar from '../mountComponents/CalendarDatePicker';
import DropdownList from '../mountComponents/DropdownList';
import Submit from '../mountComponents/Submit';
import { Row } from 'antd';
import { configParam } from '../config/fetch/config';

export default function SearchBarChart() {
  return (
    <form>
      <div id="chart-search-bar">
        <Row justify="start" gutter={8}>
          <DropdownList configs={configParam.query.CameraID.formElementProps} />
          <Calendar configs={configParam.query.From.formElementProps} />
          <Calendar configs={configParam.query.To.formElementProps} />
          <DropdownList configs={configParam.query.ClassID.formElementProps} />
          <Submit />
        </Row>
      </div>
    </form>
  );
}
