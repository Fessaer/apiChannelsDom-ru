import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css'
var convert = require('xml-js');

export default function Submit() {

  const [inState, inSetState] = useContext(Context);
  
  const { searchStartDate,
    searchEndDate,
    elements, 
    SessionID, 
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    classID } = inState;
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
    requestForm.set('Limit', 21)
    requestForm.set('TPlusCoveralls[ClassID]', classID)
    requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
    if (new Date(searchStartDate) < new Date(searchEndDate) && new Date() > new Date(searchEndDate) && new Date() > new Date(searchStartDate)) {
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
      console.log(parseData, 'pagination')
      const { elements } = parseData
      if (typeof elements[0]['elements'] !== "undefined") {
        if (elements[0].elements.length < 21) {
          noRenderPagination = true
        } else {
          noRenderPagination = false
        }
      inSetState({...inState, elements:[...elements[0].elements], activePage: 1, lengthPagination: 0, noRenderPagination})
      }
      if (typeof elements[0]['elements'] === "undefined") {
        inSetState({...inState, elements:[], activePage: 1, lengthPagination: 0})
      }
    } catch (err) {
      console.log(err, 'err2', elements in elements)
      // обработка ошибки
    }
    }).catch((e) => {
      console.log(e)
    })
    } else {
      console.log('отмена запроса из за некоректной даты')
    }
  }
  return (
    <div className="col-lg-2 col-sm-4 pb-3 d-flex align-items-end button_max_width">
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlSearch}>Применить</button>
    </div>
  )
}
