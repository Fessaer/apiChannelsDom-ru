import React, { useContext, useState } from 'react';
import { Context } from '../Store';
var convert = require('xml-js');


export default function Home() {
  const [inState, inSetState] = useContext(Context);
  const [offsetState, setOffsetState] = useState({offset: 0});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  let { offset } = offsetState
  let { count } = inState;
  const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  const requestForm = new FormData()
  // ChangePasswordAtNextLogin
  // SessionID
  const { SessionID } = inState;
  const { ChangePasswordAtNextLogin } = inState;
  console.log(inState, 'inState users')
  // console.log(SessionID, ChangePasswordAtNextLogin)
  requestForm.set('SessionID', SessionID)
  requestForm.set('ChangePasswordAtNextLogin', ChangePasswordAtNextLogin)
  requestForm.set('Analytics', 'TPlusCoveralls')
  requestForm.set('From', `${startDate.toISOString().substring(0, 10) + ' 00:00:00'}`)
  requestForm.set('To', `${endDate.toISOString().substring(0, 10) + ' 23:30:10'}`)
  requestForm.set('Offset', offset)
  requestForm.set('Limit', 20)
  requestForm.set('TPlusCoveralls[ClassID]', 3)
  requestForm.set('TPlusCoveralls[EventSubjectID]', 553)

  const firstFetchData = async() => {
    await fetch(apiUrlGetData, {
      method: 'POST',
      body: requestForm
    }).then(function(response) {
      const dataResponseText = response.text();
      // console.log(dataResponseText, 'dataResponseText')
      return dataResponseText;
    }).then((data) => {
      // console.log(data)
      let result = convert.xml2json(data, {compact: false});
      console.log(result, 'result')
    let parseData = JSON.parse(result)
    console.log(parseData)
  })
}
  firstFetchData()

  return (
    <>
    <div>
      Users
    </div>
    <div>
      {count}
    </div>
    </>
  )
}
