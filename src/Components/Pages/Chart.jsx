import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css'
import { BarChart, Bar, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, ReferenceLine, Line, Legend } from 'recharts';
import Calendar from '../mountComponents/CalendarDatePicker';
import DropdownList from '../mountComponents/DropdownList';
import SearchBar from './SearchBar';
import Submit from '../mountComponents/Submit'
import Spinner from '../mountComponents/Spinner';

var convert = require('xml-js');



export default function Chart(props) {
  const [globalState, inSetState] = useContext(Context);
  let { count } = globalState;

  const { searchStartDate,
    searchEndDate,
    elements, 
    SessionID, 
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    ClassID,
    elementsRechart } = globalState;
  let { noRenderPagination, loadingSpinner } = globalState;

  const buttonHabdler = () => {
    console.log(globalState, 'state button')
    count = count + 1;
    inSetState({...globalState, count})
  }
  // const handlSearch = async () => {
  //   const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  //   const requestForm = new FormData()
  //   requestForm.set('SessionID', SessionID)
  //   requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  //   requestForm.set('Analytics', 'TPlusCoveralls')
  //   requestForm.set('From', `${searchStartDate}`)
  //   requestForm.set('To', `${searchEndDate}`)
  //   requestForm.set('Offset', 0)
  //   // requestForm.set('Limit', 21)
  //   requestForm.set('TPlusCoveralls[ClassID]', ClassID)
  //   requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
  //   requestForm.set('CountBy', 'day')
    
  //     console.log('...ЗАПРОС =>>>')
  //     await fetch(apiUrlGetData, {
  //       method: 'POST',
  //       body: requestForm
  //     }).then((response) => {
  //       try {
  //       const dataResponseText = response.text();
  //       console.log(dataResponseText, 'dataResponseText RenderTable')
  //       return dataResponseText;
  //     } catch (err) {
  //       console.log(err, 'err')
  //       // обработка ошибки
  //     }
        
  //     }).then((data) => {
  //       try {
  //     let result = convert.xml2json(data, {compact: false});
  //     let parseData = JSON.parse(result)
  //     // console.log(parseData, 'pagination')
  //     const { elements } = parseData
  //     console.log(elements, 'charts')
  //   } catch (err) {
  //     console.log(err, 'err2', elements in elements)
  //     // обработка ошибки
  //   }
  //   }).catch((e) => {
  //     console.log(e)
  //   })
    
  // }
  const handlStoreInfo = () => {
    console.log(globalState)
  }
  
  return (
    <>
    <Spinner />
    <div className="row">
      <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'Камера'} />
      <Calendar name={'From'} labelName={'Дата и время (от)'}/>
      <Calendar name={'To'} labelName={'Дата и время (до)'}/>
      <DropdownList name={'ClassID'} items={[{1:'Каска'}, {2: 'Куртка'}, {3: 'Штаны'}, {4: 'Все'}]} labelName={'Класс объекта'} />
      {/* <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} /> */}
      <Submit handleSearch={() => props.fetchFunction()}/>
      {/* <DataTable /> */}
    </div>
    {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Запрос</button> */}
    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlStoreInfo}>Вывод</button>
    {/* <ResponsiveContainer width="95.5%" height={600}>
      <BarChart data={elementsRechart}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar  dataKey='Каска' fill="#8884d8" />
        <Bar  dataKey='Куртка' fill="#82ca9d" />
        <Bar  dataKey='Ноги' fill="#ffb700" />
        
      </BarChart>
    </ResponsiveContainer> */}
    </>
    
  )
}
