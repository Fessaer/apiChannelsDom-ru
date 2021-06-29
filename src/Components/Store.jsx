import React, { useState } from 'react';
import { configParam } from './config/fetch/config'

 

    let initialState = {
      fetch: {
        chart: {
          To: configParam.defaultFrom,
          From: configParam.defaulrTo,
          ClassID: configParam.ClassID,
          EventSubjectID: configParam.EventSubjectIDdefault,
          Offset: configParam.Offset,
        },
        report: {
          From: configParam.defaultFrom,
          To: configParam.defaulrTo,
          ClassID: configParam.ClassID,
          Offset: configParam.Offset,
        },
        Algorithm: configParam.Algorithm,
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