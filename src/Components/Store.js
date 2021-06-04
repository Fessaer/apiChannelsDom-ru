import React, { useState } from 'react';


// connect in bd
// console.log()
    //
    let initialState = {
      noRenderPagination: false,    //включает\выключает пагинацию
      lengthPagination: 0,          //регулирует дину пагинации
      activePage: 1,                //синхронизация пагинации
      count: 0,                     // тестовый стейт
      elements: [],                 //длина рresponse массива 
      datePicker1: {},              
      datePicker2: {},
      loadingComplite: false,       //проверка загрузки данных перед рендером
      startDate: new Date(),        //вроде не используеться
      endDate: new Date(),          //вроде не используеться
      offset: 0,                    //вроде не используеться
      classID: '1',                 //опции поиска
      eventSubjectID: '552',        //опции поиска
      subClassID: '2',              //опции поиска
      renderCountItems: 20,         //опции поиска
      searchStartDate: new Date().toISOString().substring(0, 10) + ' 01:00:00', // начальная дата
      searchEndDate: new Date().toISOString().substring(0, 10) + ' 23:59:59', // начальная дата
    }

export const Context = React.createContext();

const Store = ({children}) => {
  
  // console.log(children[0], 'children.props')
  const {SessionID, ChangePasswordAtNextLogin, validate} = children[0];
  // console.log(children[0], 'children[0]')
  // const initialState = children[0]
  initialState['SessionID'] = SessionID;
  initialState['ChangePasswordAtNextLogin'] = ChangePasswordAtNextLogin;
  initialState['validate'] = validate;
  // console.log(initialState, 'initialState')
  const [inState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[inState, inSetState]}>{children[1]}</Context.Provider>
  )
}
export default Store;