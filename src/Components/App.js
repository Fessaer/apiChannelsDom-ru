import React, {useState, useEffect} from 'react';

import './Styles/App.css';
import Navigation from './Navigation';
import Store from './Store';
// import { FormData } from 'formdata-polyfill/esm-min.js'

function App() {
  const [dataState, setDataState] = useState({validate: false})

  useEffect(() => {
    (async function fetchData() {
      let http = new XMLHttpRequest();
      let urle = 'http://va.fpst.ru:8080/api/login';
      let bodyfetch = 'Login=' + encodeURIComponent('tplusfront') +
      '&Password=' + encodeURIComponent('tplusfront00');
      http.open('POST', urle, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send(bodyfetch);
      http.onreadystatechange = function() {//Call a function when the state changes.
        if  (http.readyState === 4 && http.status === 200) {
          
            let response = http.responseText;
            // console.log(JSON.parse(response) )
            const { SessionID, ChangePasswordAtNextLogin } = JSON.parse(response);
            setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
        }
      }
      // 
      // let response = http.responseText
      // const { SessionID, ChangePasswordAtNextLogin } = JSON.parse(response);
      // setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
      //   setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
      // console.log(bodyfetch.length)
      // await fetch(urle, {
      //   method: 'POST',
      //   body: bodyfetch,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // }).then(function(response) {
      //   let data = response.text()
      //   console.log(data)
      //   return data;
      // }).then((inf) => {
      //   const { SessionID, ChangePasswordAtNextLogin } = JSON.parse(inf);
      //   setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
      // }).catch((err) => console.log(err, 'error response auth'))
    })()

  }, [])
  // console.log(dataState, 'dataState')
  const { validate } = dataState;
  if (validate === false) {
    return null;
  } else {

  return (
    // <Router>
      <Store>
          {dataState}
        <Navigation />
      </Store>
    // </Router>
  )
  }
}

export default App;
