import React from 'react';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import Calendar from '../mountComponents/CalendarDatePicker';
import DropdownList from '../mountComponents/DropdownList';
import Submit from '../mountComponents/SubmitSpinner';


export default function SearchBarChart() {
  console.log('searchBar  Chart')
  return (
    <form>
      <div id="chart-search-bar" className="row">
        <DropdownList name={'CameraID'} items={[{ 2: 'Все камеры' }, { '650': 'Помещение 107' }, { '697': 'Спецодежда VLC stream' }]} labelName={'Камера'} />
        <Calendar name={'From'} labelName={'Дата и время (от)'}  period={'7'} />
        <Calendar name={'To'} labelName={'Дата и время (до)'} period={'0'} />
        <DropdownList name={'ClassID'} items={[{ 4: 'Все объекты' }, { 1: 'Каска' }, { 2: 'Куртка' }, { 3: 'Штаны' }]} labelName={'Объект'} />
        <Submit />
      </div>
    </form>
  )
}
