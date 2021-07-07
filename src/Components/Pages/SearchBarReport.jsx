/* eslint-disable no-unused-vars */
import React from 'react';
import DropdownList from '../mountComponents/DropdownList';
import Calendar from '../mountComponents/CalendarDatePicker';
import Submit from '../mountComponents/Submit';
import { configParamTest } from '../config/fetch/config'
import { Row } from 'antd';

export default function SearchBar() {
  return (
    <form className="searchForm">
          <Row justify="start" gutter={8} >
            <DropdownList configs={configParamTest.query.CameraID.formElementProps} />
            <Calendar configs={configParamTest.query.From.formElementProps} />
            <Calendar configs={configParamTest.query.To.formElementProps} />
            <DropdownList configs={configParamTest.query.ClassID.formElementProps} />
            <DropdownList configs={configParamTest.query.EventSubjectID.formElementProps} />
            <Submit />
          </Row>
    </form>
  )
}
