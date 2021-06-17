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
        algorithm: 'TPlusCoveralls',
        offset: 0,
      },
      ui: {
        noRenderPagination: true,
        lengthPagination: 1,
        activePage: 1,
        renderCountItems: 20,  
      },
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