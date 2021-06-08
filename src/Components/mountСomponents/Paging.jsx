import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
var convert = require('xml-js');

export default function Paging() {
  const [inState, inSetState] = useContext(Context);
  let { elements, lengthPagination, offset, noRenderPagination } = inState;
  const { 
    SessionID,
    ChangePasswordAtNextLogin, 
    eventSubjectID, 
    ClassID,
    searchStartDate, 
    searchEndDate } = inState;
    
    const handlPagination = async (e, f) => {
      console.log(e, 'e => activePage')
      lengthPagination = (e - 1) * 20
      console.log(e, f)
      const newOffSet = (e - 1) * 20
      const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
      const requestForm = new FormData()
      console.log(newOffSet, 'newOffSet')
      offset = newOffSet;
          
      requestForm.set('SessionID', SessionID)
      requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
      requestForm.set('Analytics', 'TPlusCoveralls')
      requestForm.set('From', `${searchStartDate}`)
      requestForm.set('To', `${searchEndDate}`)
      requestForm.set('Offset', offset)
      requestForm.set('Limit', 21)
      requestForm.set('TPlusCoveralls[ClassID]', ClassID)
      requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
      
        await fetch(apiUrlGetData, {
          method: 'POST',
          body: requestForm
        }).then((response) => {
          const dataResponseText = response.text();
          console.log(dataResponseText, 'dataResponseText RenderTable')
          return dataResponseText;
        }).then((data) => {
        let result = convert.xml2json(data, {compact: false});
        let parseData = JSON.parse(result)
        console.log(parseData, 'pagination')
        const { elements } = parseData
        inSetState({...inState, elements:[...elements[0].elements], offset, activePage: e, lengthPagination, noRenderPagination: false})
      }).catch((e) => {
        console.log(e)
      })
    }
    let { activePage } = inState; 
  return (
    <div>
      {elements.length > 20 || noRenderPagination === false ? 
        <div>
          <Pagination
            current={activePage} 
            onChange={handlPagination}
            defaultPageSize={20}
            showSizeChanger={false}
            defaultCurrent={1} 
            total={elements.length < 20 ? lengthPagination + 20 : lengthPagination + 30} 
            style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
        </div> : null}
    </div>
  )
}
