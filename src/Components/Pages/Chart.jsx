import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, ReferenceLine, Line, Legend } from 'recharts';
import Calendar from '../mountСomponents/CalendarDataPicker';
import DropdownList from '../mountСomponents/DropdownList';
import SearchBar from './SearchBar';
import SubmitCharts from '../mountСomponents/SubmitCharts'
var convert = require('xml-js');



export default function Settings() {
  const [inState, inSetState] = useContext(Context);
  let { count } = inState;

  const { searchStartDate,
    searchEndDate,
    elements, 
    SessionID, 
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    ClassID,
    elementsRechart } = inState;
  let { noRenderPagination } = inState;

  const buttonHabdler = () => {
    console.log(inState, 'state button')
    count = count + 1;
    inSetState({...inState, count})
  }
  const handlSearch = async () => {
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    const requestForm = new FormData()
    requestForm.set('SessionID', SessionID)
    requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
    requestForm.set('Analytics', 'TPlusCoveralls')
    requestForm.set('From', `${searchStartDate}`)
    requestForm.set('To', `${searchEndDate}`)
    requestForm.set('Offset', 0)
    // requestForm.set('Limit', 21)
    requestForm.set('TPlusCoveralls[ClassID]', ClassID)
    requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
    requestForm.set('CountBy', 'day')
    
      console.log('...ЗАПРОС =>>>')
      await fetch(apiUrlGetData, {
        method: 'POST',
        body: requestForm
      }).then((response) => {
        try {
        const dataResponseText = response.text();
        console.log(dataResponseText, 'dataResponseText RenderTable')
        return dataResponseText;
      } catch (err) {
        console.log(err, 'err')
        // обработка ошибки
      }
        
      }).then((data) => {
        try {
      let result = convert.xml2json(data, {compact: false});
      let parseData = JSON.parse(result)
      // console.log(parseData, 'pagination')
      const { elements } = parseData
      console.log(elements, 'charts')
    } catch (err) {
      console.log(err, 'err2', elements in elements)
      // обработка ошибки
    }
    }).catch((e) => {
      console.log(e)
    })
    
  }
  const handlStoreInfo = () => {
    console.log(inState)
  }
  
  return (
    <>
    <div className="row">
      <DropdownList name={'Cameras'} items={[{'Спецодежда VLC stream': 'Спецодежда VLC stream'}]} labelName={'камера'} />
      <Calendar name={'From'} labelName={'Дата и время (от)'}/>
      <Calendar name={'To'} labelName={'Дата и время (до)'}/>
      <DropdownList name={'ClassID'} items={[{1:'Голова'}, {2: 'Туловище'}, {3: 'Ноги'}, {4: 'Все'}]} labelName={'класс объекта'} />
      {/* <DropdownList name={'eventSubjectID'} items={[{552:'Нестандартная спецодежда'}, {553: 'Стандартная спецодежда'}]} labelName={'Спецодежда'} /> */}
      <SubmitCharts />
      {/* <DataTable /> */}
    </div>
    {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Запрос</button> */}
    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlStoreInfo}>Вывод</button>
    <ResponsiveContainer width="95.5%" height={600}>
      <LineChart data={elementsRechart}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey='Голова' stroke="#8884d8" />
        <Line type="monotone" dataKey='Туловище' stroke="#82ca9d" />
        <Line type="monotone" dataKey='Ноги' stroke="#ffb700" />
      </LineChart>
    </ResponsiveContainer>
    </>
    
  )
}
