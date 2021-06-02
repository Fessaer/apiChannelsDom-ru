import React, {useState, useEffect} from 'react';

import './Styles/App.css';
import Navigation from './Navigation';
import Store from './Store';


function App() {
  const [dataState, setDataState] = useState({validate: false})

  useEffect(() => {
    (async function fetchData() {
      console.log('useEffect')
      let urle = 'http://va.fpst.ru:8080/api/login';
      const form = new FormData();
      form.set('Login', 'tplusfront')
      form.set('Password', 'tplusfront00')
      await fetch(urle, {
        method: 'POST',
        body: form
      }).then(function(response) {
        let data = response.text()
        console.log(data)
        return data;
      }).then((inf) => {
        const { SessionID, ChangePasswordAtNextLogin } = JSON.parse(inf);
        setDataState({SessionID, ChangePasswordAtNextLogin, validate: true})
      }).then(() =>{

      }).catch((err) => console.log(err, 'error response auth'))
    })()
   }, [])
   console.log(dataState, 'dataState')
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
