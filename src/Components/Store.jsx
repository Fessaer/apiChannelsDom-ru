import React, { useState } from 'react';
import { configParam, configFetch, defaultParam } from './config/fetch/config'

 

    let initialState = {
      fetch: {
        chart: {
          To: configParam['To'],
          From: configParam['From'],
          ClassID: configParam['ClassID'],
          EventSubjectID: configParam['EventSubjectID'],
          Offset: configParam['Offset'],
          Limit: defaultParam.chart.Limit,
          CountBy: defaultParam.chart.CountBy,
          CameraID: configParam['CameraID']
        },
        report: {
          From: configParam['From'],
          To: configParam['To'],
          ClassID: configParam['ClassID'],
          Offset: configParam['Offset'],
          EventSubjectID: configParam['EventSubjectID'],
          Limit: defaultParam.report.Limit,
          CameraID: configParam['CameraID']
        }
      },
      ui: {
        noRenderPagination: true,
        lengthPagination: 1,
        activePage: 1,
        renderCountItems: 20,
        loadingSpinnerChart: false,
        loadingSpinnerReport: false,  
      },
      Analytics: configFetch['Algorithm'],
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