/* eslint-disable no-unused-vars */
import React from 'react';
import DropdownList from '../mountComponents/DropdownList';
import Calendar from '../mountComponents/CalendarDatePicker';
import Submit from '../mountComponents/Submit';

export default function SearchBar(props) {
  return (
    <form className="searchForm">
      <div className="row">
        <DropdownList name={'CameraIdReport'} items={[{ 2: 'Все камеры' }, { '697': 'Спецодежда VLC stream' }, { '650': 'Помещение 107' }]} labelName={'Камера'} />
        <Calendar name={'From'} labelName={'Дата и время (от)'} period={7}/>
        <Calendar name={'To'} labelName={'Дата и время (до)'} period={0}/>
        <DropdownList name={'ClassIdReport'} items={[{ 4: 'Все объекты' }, { 1: 'Каска' }, { 2: 'Куртка' }, { 3: 'Штаны' }]} labelName={'Объект'} />
        <DropdownList name={'eventSubjectID'} items={[{ 552: 'Нестандартная спецодежда' }, { 553: 'Стандартная спецодежда' }]} labelName={'Спецодежда'} />
        <Submit />
      </div>
    </form>
  )
}
