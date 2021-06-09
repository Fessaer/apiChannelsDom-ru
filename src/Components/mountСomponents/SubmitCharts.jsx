import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'

// import '../Styles/searchBar.css'
var convert = require('xml-js');

export default function Submit() {

  const [inState, inSetState] = useContext(Context);
  
  const { searchStartDate,
    searchEndDate,
    elementsRechart, 
    SessionID, 
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    ClassID } = inState;
  let { noRenderPagination } = inState;
  
  const handlSearch = async (e) => {
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
    if (new Date(searchStartDate) < new Date(searchEndDate) && new Date() > new Date(searchEndDate) && new Date() > new Date(searchStartDate)) {
      console.log('...ЗАПРОС =>>>')
      if (ClassID === '4') {
        console.log('ClassID === 4')
        requestForm.set('SessionID', SessionID)
      } else {
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
      console.log(parseData)
      const { elements } = parseData
      const arrElements = elements[0].elements
      console.log(arrElements, 'recharts data')
      const mappingClassID = {
        '1': 'Голова',
        '2': 'Туловище',
        '3': 'Ноги'
      }
      const normalasedData = arrElements.map((item) => {
        const d = item.elements[0].elements[0].text
        const count = item.elements[1].elements[0].text
        const date = formatDateToLocale(new Date(d), 'dd.mm.yyyy')
        // console.log(date, count)
        
        const nameLine = mappingClassID[ClassID]
        console.log(mappingClassID.ClassID)
        return {date: date, [nameLine]: count, ClassID: ClassID}
      })
      let arrNewData = [];
      
      inSetState({...inState, elementsRechart: normalasedData})
      console.log(normalasedData, 'normalasedData')
    } catch (err) {
      console.log(err, 'err2')
      // обработка ошибки
    }
    }).catch((e) => {
      console.log(e)
    })
    }
    } else {
      console.log('отмена запроса из за некоректной даты')
    }
    
  }

  return (
    <div className="col-lg-2 col-sm-4 d-flex align-items-center button_max_width">
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить Recharts</button>
    </div>
  )
}