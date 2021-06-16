import React, { useState } from 'react';


// connect in bd
// console.log()
    //
    let initialState = {
      fetch: {
        chart: {
          loadingSpinnerChart: false,
          ClassIdChart: "",
          EventSubjectID: "552",
        },
        report: {
          ClassIdReport: "",
          loadingSpinnerReport: false,
        },
      },
      // loadingSpinnerChart: false,
      // loadingSpinnerReport: false,
      // loadingSpinner: false,
      algorithm: 'TPlusCoveralls',
      noRenderPagination: true,    //включает\выключает пагинацию
      lengthPagination: 1,          //регулирует дину пагинации
      activePage: 1,                //синхронизация пагинации
      // elementsRechart: [],                     // графики
      // elementsReport: [],                 //длина рresponse массива 
      loadingComplite: false,       //проверка загрузки данных перед рендером
      offset: 0,                    // динамический оффсет
      ClassID: '',                 //опции поиска
      eventSubjectID: '552',        //опции поиска
      renderCountItems: 20,         //опции поиска
      searchStartDate: new Date().toISOString().substring(0, 10) + ' 00:00:00', // начальная дата
      searchEndDate: new Date().toISOString().substring(0, 10) + ' 23:59:59', // начальная дата
    }

export const Context = React.createContext();

const Store = ({children}) => {
  
  const {SessionID, ChangePasswordAtNextLogin, validate} = children[0];

  initialState['SessionID'] = SessionID;
  initialState['ChangePasswordAtNextLogin'] = ChangePasswordAtNextLogin;
  initialState['validate'] = validate;
  const [globalState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[globalState, inSetState]}>{children[1]}</Context.Provider>
  )
}
export default Store;


// searchStartDateChart: new Date().toISOString().substring(0, 10) + ' 00:00:00',
// searchEndDateChart: new Date().toISOString().substring(0, 10) + ' 23:59:59',