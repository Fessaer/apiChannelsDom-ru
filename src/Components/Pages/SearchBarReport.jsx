/* eslint-disable no-unused-vars */
import React from 'react';
import DropdownList from '../mountComponents/DropdownList';
import Calendar from '../mountComponents/CalendarDatePicker';
import Submit from '../mountComponents/Submit';

export default function SearchBar() {
  return (
    <form className="searchForm">
      <div className="row">
        <DropdownList name={'CameraID'} items={[{ 2: 'Все камеры' }, { '697': 'Спецодежда VLC stream' }, { '650': 'Помещение 107' }]} labelName={'Камера'} />
        <Calendar name={'From'} labelName={'Дата и время (от)'} period={7}/>
        <Calendar name={'To'} labelName={'Дата и время (до)'} period={0}/>
        <DropdownList name={'ClassID'} items={[{ 4: 'Все объекты' }, { 1: 'Каска' }, { 2: 'Куртка' }, { 3: 'Штаны' }]} labelName={'Объект'} />
        <DropdownList name={'EventSubjectID'} items={[{ 552: 'Нестандартная спецодежда' }, { 553: 'Стандартная спецодежда' }]} labelName={'Спецодежда'} />
        <Submit />
      </div>
    </form>
  )
}
