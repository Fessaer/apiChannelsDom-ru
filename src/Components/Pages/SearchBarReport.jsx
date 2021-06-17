/* eslint-disable no-unused-vars */
import React from 'react';
import DropdownList from '../mountComponents/DropdownList';
import Calendar from '../mountComponents/CalendarDatePicker';
import Submit from '../mountComponents/Submit';

export default function SearchBar(props) {
  return (
      <form className="searchForm">
        <div className="row">
          <DropdownList name={'CameraIdReport'} items={[{'697': 'Спецодежда VLC stream'}, {'650': 'Помещение 107'}, {2: 'Все камеры'}]} labelName={'Камера'} />
          <Calendar name={'From'} labelName={'Дата и время (от)'}/>
          <Calendar name={'To'} labelName={'Дата и время (до)'}/>
          <DropdownList name={'ClassIdReport'} items={[{1:'Каска'}, {2: 'Куртка'}, {3: 'Штаны'}, {4: 'Всё'}]} labelName={'Класс объекта'} />
          <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} />
          <Submit />
        </div>
    </form>
  )
}
