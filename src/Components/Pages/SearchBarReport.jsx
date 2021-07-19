/* eslint-disable no-unused-vars */
import React from 'react';
import DropdownList from '../mountComponents/DropdownList';
import Calendar from '../mountComponents/CalendarDatePicker';
import Submit from '../mountComponents/Submit';
import { configParam } from '../config/fetch/config';
import { Row } from 'antd';

export default function SearchBar() {
  return (
    <form className="searchForm">
      <Row justify="start" gutter={8}>
        <DropdownList configs={configParam.query.CameraID.formElementProps} />
        <Calendar configs={configParam.query.From.formElementProps} />
        <Calendar configs={configParam.query.To.formElementProps} />
        <DropdownList configs={configParam.query.ClassID.formElementProps} />
        <DropdownList
          configs={configParam.query.EventSubjectID.formElementProps}
        />
        <Submit />
      </Row>
    </form>
  );
}
