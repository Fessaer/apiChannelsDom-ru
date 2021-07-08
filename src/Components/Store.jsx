import React, { useState } from 'react';
import { configParam } from './config/fetch/config';
import keyInObject from '../Components/helpers/keyInObject';
const configParamArray = Object.entries(configParam.query);

const buidParamObject = (arr, toggle = '') => {
  let obj = {};
  arr.forEach(([key, value]) => {
    if (value.formElementProps.default !== '') {
      if (keyInObject(value.formElementProps, 'active') && value.formElementProps.active.includes(toggle)) {
        return obj[key] = value.formElementProps.default;
      } 
      if (!keyInObject(value.formElementProps, 'active')) {
        return obj[key] = value.formElementProps.default;
      }
    }
  });
  return obj;
}; 


let initialState = {
  fetch: {
    chart: buidParamObject(configParamArray, 'chart'),
    report: {
      ...buidParamObject(configParamArray, 'report'),
      Limit: 21,
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
  Analytics: configParam['Algorithm'],
};

export const Context = React.createContext();

const Store = ({children}) => {
  
  const {SessionID, validate} = children[0];

  initialState['SessionID'] = SessionID;
  initialState['validate'] = validate;
  const [globalState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[globalState, inSetState]}>{children[1]}</Context.Provider>
  )
}
export default Store;