/* eslint-disable react/prop-types */
import React, { useState } from 'react';

let initialState = {};

export const Context = React.createContext();

const Store = ({ children }) => {
  console.log(children)
  const { data } = children[0];
  // console.log(data)
  initialState['channels'] = data;
  const [globalState, inSetState] = useState(initialState);

  return (
    <Context.Provider value={[globalState, inSetState]}>
      {children[1]}
    </Context.Provider>
  );
};
export default Store;
