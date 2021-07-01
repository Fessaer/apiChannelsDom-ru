import React, {useState, useEffect} from 'react';

import './Styles/App.css';
import Navigation from './Navigation';
import Store from './Store';

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
      http.onreadystatechange = function() {
        if  (http.readyState === 4 && http.status === 200) {
          
            let response = http.responseText;
            const { SessionID, ChangePasswordAtNextLogin } = JSON.parse(response);
            setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
        }
      }
    })()
  }, [])
  const { validate } = dataState;
  if (validate === false) {
    return null;
  } else {
  return (
      <Store>
          {dataState}
        <Navigation />
      </Store>
  )
  }
}

export default App;
