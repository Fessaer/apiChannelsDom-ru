import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
import fetchFunc from '../helpers/fetchFunction';
var convert = require('xml-js');

export default function Paging(props) {
  const [globalState, inSetState] = useContext(Context);
  let { elements, lengthPagination, offset, noRenderPagination } = globalState;
  // inSetState({...globalState, toggleString: 'paging'})
  useEffect(() => {
    inSetState({...globalState, toggleString: 'paging'})
    console.log('useEffect')
  }, [])

  const handlePaging = async(e, f) => {
    // e.preventDefault();
    // console.log(props, 'paging')
      inSetState({...globalState, toggleString: 'paging', loadingSpinner: true});
      console.log(e, 'e => activePage');
      lengthPagination = (e - 1) * 20;
      const newOffSet = (e - 1) * 20;
      offset = newOffSet;
      // inSetState({...globalState, offset})
      
      inSetState({...globalState, offset, activePage: e, lengthPagination, noRenderPagination: false});
      const dataFetch = await fetchFunc(globalState, e);
      inSetState({...globalState, elements:[...dataFetch], offset, activePage: e, lengthPagination, noRenderPagination: false, loadingSpinner: false});
      await console.log(globalState, 'globalState');
  }
  // const { 
  //   SessionID,
  //   ChangePasswordAtNextLogin, 
  //   eventSubjectID, 
  //   ClassID,
  //   searchStartDate, 
  //   searchEndDate } = globalState;
    
    // const handlPagination = async (e, f) => {
    //   console.log(props, 'paging')
    //   inSetState({...globalState, loadingSpinner: true})
    //   console.log(e, 'e => activePage')
    //   lengthPagination = (e - 1) * 20
    //   console.log(e, f)
    //   const newOffSet = (e - 1) * 20
    //   const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    //   const requestForm = new FormData()
    //   console.log(newOffSet, 'newOffSet')
    //   offset = newOffSet;
          
    //   requestForm.set('SessionID', SessionID)
    //   requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
    //   requestForm.set('Analytics', 'TPlusCoveralls')
    //   requestForm.set('From', `${searchStartDate}`)
    //   requestForm.set('To', `${searchEndDate}`)
    //   requestForm.set('Offset', offset)
    //   requestForm.set('Limit', 21)
    //   requestForm.set('TPlusCoveralls[ClassID]', ClassID)
    //   requestForm.set('TPlusCoveralls[EventSubjectID]', eventSubjectID)
      
    //     await fetch(apiUrlGetData, {
    //       method: 'POST',
    //       body: requestForm
    //     }).then((response) => {
    //       const dataResponseText = response.text();
    //       console.log(dataResponseText, 'dataResponseText RenderTable')
    //       return dataResponseText;
    //     }).then((data) => {
    //     let result = convert.xml2json(data, {compact: false});
    //     let parseData = JSON.parse(result)
    //     console.log(parseData, 'pagination')
    //     const { elements } = parseData
    //     inSetState({...globalState, elements:[...elements[0].elements], offset, activePage: e, lengthPagination, noRenderPagination: false, loadingSpinner: false})
    //   }).catch((e) => {
    //     console.log(e)
    //     inSetState({...globalState, loadingSpinner: false})
    //   })
    // }
    let { activePage } = globalState; 
    console.log(elements.length, 'elements.length')
  return (
    <div>
      {elements.length > 20 || noRenderPagination === false ? 
        <div>
          <Pagination
            current={activePage} 
            onChange={handlePaging}
            defaultPageSize={20}
            showSizeChanger={false}
            defaultCurrent={1} 
            total={elements.length < 20 ? lengthPagination + 20 : lengthPagination + 30} 
            style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
        </div> : null}
    </div>
  )
}
