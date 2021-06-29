import React, { useState } from 'react';
import { configParam } from './config/fetch/config'

 

    let initialState = {
      fetch: {
        chart: {
          searchStartDateChart: configParam.defaultDateStart,
          searchEndDateChart: configParam.defaulrDateEnd,
          ClassID: configParam.classID,
          eventSubjectID: configParam.eventSubjectIDdefault,
        },
        report: {
          searchStartDateReport: configParam.defaultDateStart,
          searchEndDateReport: configParam.defaulrDateEnd,
          ClassID: configParam.classID,
        },
        algorithm: configParam.algorithm,
        offset: configParam.offset,
      },
      ui: {
        noRenderPagination: true,
        lengthPagination: 1,
        activePage: 1,
        renderCountItems: 20,
        loadingSpinnerChart: false,
        loadingSpinnerReport: false,  
      },
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