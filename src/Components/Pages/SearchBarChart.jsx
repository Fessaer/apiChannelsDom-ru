import React from 'react';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import Calendar from '../mountComponents/CalendarDatePicker';
import DropdownList from '../mountComponents/DropdownList';
import Submit from '../mountComponents/SubmitSpinner';
import { Row } from 'antd';

const styleRow = { paddingLeft: '16px' };

export default function SearchBarChart() {
  return (
    <form>
      <div id="chart-search-bar">
        <Row justify="start" gutter={8} style={styleRow}>
          <DropdownList name={'CameraID'} items={[{ 2: 'Все камеры' }, { '650': 'Помещение 107' }, { '697': 'Спецодежда VLC stream' }]} labelName={'Камера'} />
          <Calendar name={'From'} labelName={'Дата и время (от)'}  period={'7'} />
          <Calendar name={'To'} labelName={'Дата и время (до)'} period={'0'} />
          <DropdownList name={'ClassID'} items={[{ 4: 'Все объекты' }, { 1: 'Каска' }, { 2: 'Куртка' }, { 3: 'Штаны' }]} labelName={'Объект'} />
          <Submit />
        </Row>
      </div>
    </form>
  )
}
