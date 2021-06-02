import React, { useState } from 'react';


// connect in bd
// console.log()
    //
    const initialState = {
      count: 0,
      elements: [],
    }

export const Context = React.createContext();

const Store = ({children}) => {
  
  // console.log(children[0], 'children.props')
  const {SessionID, ChangePasswordAtNextLogin, validate} = children[0];
  // console.log(children[0], 'children[0]')
  // const initialState = children[0]
  initialState['SessionID'] = SessionID;
  initialState['ChangePasswordAtNextLogin'] = ChangePasswordAtNextLogin;
  initialState['validate'] = validate;
  console.log(initialState, 'initialState')
  const [inState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[inState, inSetState]}>{children[1]}</Context.Provider>
  )
}
export default Store;