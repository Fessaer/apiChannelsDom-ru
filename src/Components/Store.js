import React, { useState } from 'react';


// connect in bd
// console.log()
    //
    let initialState = {
      loadingSpinner: false,
      algorithm: '',
      noRenderPagination: true,    //включает\выключает пагинацию
      lengthPagination: 0,          //регулирует дину пагинации
      activePage: 1,                //синхронизация пагинации
      count: 0,
      elementsRechart: [],                     // графики
      elements: [],                 //длина рresponse массива 
      loadingComplite: false,       //проверка загрузки данных перед рендером
      startDate: new Date(),        // используеться при стартовой загрузке
      endDate: new Date(),          // используеться при стартовой загрузке
      offset: 0,                    // динамический оффсет
      ClassID: '1',                 //опции поиска
      eventSubjectID: '552',        //опции поиска
      subClassID: '2',              //опции поиска
      renderCountItems: 20,         //опции поиска
      searchStartDate: new Date().toISOString().substring(0, 10) + ' 01:00:00', // начальная дата
      searchEndDate: new Date().toISOString().substring(0, 10) + ' 23:59:59', // начальная дата
    }

export const Context = React.createContext();

const Store = ({children}) => {
  
  const {SessionID, ChangePasswordAtNextLogin, validate} = children[0];

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