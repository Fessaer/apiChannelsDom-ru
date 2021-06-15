/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Store';
import DropdownList from '../mountСomponents/DropdownList';
import Calendar from '../mountСomponents/CalendarDatePicker';
import Submit from '../mountСomponents/Submit';
import fetchFunc from '../helpers/fetchFunction';




export default function SearchBar(props) {
  const [globalState, inSetState] = useContext(Context);

  const handleForm = async (e) => {    //подключаеться если нужен поиск не по кнопке
    e.preventDefault();
    console.log('EVENT');
    inSetState({...globalState, loadingSpinner: true});
    const dataFetch = await fetchFunc(globalState);
    console.log(dataFetch);
    inSetState({...globalState, elements: [...dataFetch.arr], offset: 0, activePage: 1, loadingSpinner: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination})
  }

  return (
      <form className="searchForm">
        <div className="row">
          <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'Камера'} />
          <Calendar name={'From'} labelName={'Дата и время (от)'}/>
          <Calendar name={'To'} labelName={'Дата и время (до)'}/>
          <DropdownList name={'ClassID'} items={[{1:'Каска'}, {2: 'Куртка'}, {3: 'Штаны'}, {4: 'Всё'}]} labelName={'Класс объекта'} />
          <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} />
          <Submit />
          {/* <DataTable /> */}

          {/* <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width"> */}
          {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button> */}
          {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleTest}>Check</button> */}
        </div>
      {/* </div> */}
    </form>
  )
}
