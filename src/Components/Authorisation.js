// import React, {useState, useEffect, useContext} from 'react';
// import { Context } from './Store';

// const Authorisation = () => {
//   // const [inState, inSetState] = useContext(Context);
//   let urle = 'http://va.fpst.ru:8080/api/login';
//     const form = new FormData();
//     form.set('Login', 'tplusfront')
//     form.set('Password', 'tplusfront00')
//   useEffect(() => {
//     fetch(urle, {
//       // mode: 'no-cors',
//       method: 'POST',
//       body: form
//     }).then(function(response) {
//       let data = response.text()
//       console.log(data)
//       // console.log(parseData, 'data')
//       // inSetState({})
//       return data;
//     }).then((inf) => {
//       const isLoginState = JSON.parse(inf)
//       console.log(isLoginState)
//     }).catch((err) => console.log(err, 'error response auth'))
// }, []);
// }

// export default Authorisation;
