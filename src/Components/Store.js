import React, { useState } from 'react';
import formatDateToLocale from './helpers/functionFormatReplaceDate';


  let d = new Date(); // today!
  d.setDate(d.getDate() - 7);
  const period = "yyyy-mm-dd"
  const defaultDateStart = formatDateToLocale(d, period)
  // console.log(defaultDateStart)

    let initialState = {
      fetch: {
        chart: {
          searchStartDateChart: defaultDateStart + ' 00:00:00',
          searchEndDateChart: formatDateToLocale(new Date(), period) + ' 00:00:00',
          loadingSpinnerChart: false,
          ClassIdChart: "",
          eventSubjectID: "552",
        },
        report: {
          searchStartDateReport: defaultDateStart + ' 00:00:00',
          searchEndDateReport: formatDateToLocale(new Date(), period) + ' 00:00:00',
          ClassIdReport: "",
          loadingSpinnerReport: false,
        },
        algorithm: 'TPlusCoveralls',
        offset: 0,
      },
      ui: {
        noRenderPagination: true,
        lengthPagination: 1,
        activePage: 1,
        renderCountItems: 20,  
      },
      // searchStartDate: new Date().toISOString().substring(0, 10) + ' 00:00:00', // начальная дата
      // searchEndDate: new Date().toISOString().substring(0, 10) + ' 23:59:59', // начальная дата
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