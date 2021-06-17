import React from 'react';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import Calendar from '../mountComponents/CalendarDatePicker';
import DropdownList from '../mountComponents/DropdownList';
import Submit from '../mountComponents/Submit';
import Spinner from '../mountComponents/Spinner';

export default function SearchBarChart() {
  return (
    <form>
      <div className="row">
        <Spinner />
        <DropdownList name={'CameraIdChart'} items={[{2: 'Все камеры'}, {'650': 'Помещение 107'}, {'697': 'Спецодежда VLC stream'}]} labelName={'Камера'} />
        <Calendar name={'From'} labelName={'Дата и время (от)'}/>
        <Calendar name={'To'} labelName={'Дата и время (до)'}/>
        <DropdownList name={'ClassIdChart'} items={[{4: 'Все классы'}, {1:'Каска'}, {2: 'Куртка'}, {3: 'Штаны'} ]} labelName={'Класс объекта'} />
        <Submit />
      </div>
    </form>
  )
}
