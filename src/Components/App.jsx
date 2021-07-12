import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import Store from './Store';

function App() {
  const [dataState, setDataState] = useState({validate: false});

  let targetValidationCookie = false;
  document.cookie.split('; ').forEach((str) => {
    const arrCookie = str.split('=');
    const [, value] = arrCookie;
    if (arrCookie.includes('PHPSESSIDFPST')) {
      targetValidationCookie = value;
    }
  });

  useEffect(() => {
    if (targetValidationCookie) {
      setDataState({SessionID: targetValidationCookie, validate: true})
    } else {
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
            const { SessionID } = JSON.parse(response);
            setDataState({SessionID, validate: true});
          }
        }
      })()
  }}, []);

  const { validate } = dataState;
  if (validate === false) {
    return null;
  } else {
    return (
        <Store>
            {dataState}
          <Navigation />
        </Store>
    );
 }
}

export default App;
