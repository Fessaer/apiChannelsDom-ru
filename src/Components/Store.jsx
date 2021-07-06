import React, { useState } from 'react';
import { configParam, configFetch, defaultParam } from './config/fetch/config'

const configParamArray = Object.entries(configParam);

const buidParamObject = (arr) => {
  let obj = {};
  arr.forEach(([key, value]) => {
    if (key === 'ClassID') obj[key] = value;
    if (value !== '' && key !== 'SessionID') obj[key] = value;
  });
  return obj;
}; 

const objct = buidParamObject(configParamArray);

let initialState = {
  fetch: {
    chart: objct,
    report: {
      ...objct,
      Limit: defaultParam.report.Limit,
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
};

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