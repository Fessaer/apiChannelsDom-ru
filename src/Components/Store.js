import React, { useState } from 'react';

const initialState = {
  count: 0
}

let urle = 'http://va.fpst.ru:8080/api/login';
    const form = new FormData();
    form.set('Login', 'tplusfront')
    form.set('Password', 'tplusfront00')
    fetch(urle, {
      method: 'POST',
      body: form
    }).then(function(response) {
      let data = response.text()
      console.log(data)
      return data;
    }).then((inf) => {
      const isLoginState = JSON.parse(inf)
      
      initialState['isLogin'] = isLoginState
      console.log(initialState, 'is')
    }).catch((err) => console.log(err, 'error response auth'))
    


export const Context = React.createContext();

const Store = ({children}) => {
  const [inState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[inState, inSetState]}>{children}</Context.Provider>
  )
}
export default Store;