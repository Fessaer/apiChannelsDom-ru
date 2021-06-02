import React, { useState } from 'react';


// connect in bd
// console.log()
    //
    const initialState = {
      count: 0
    }

export const Context = React.createContext();

const Store = ({children}) => {
  
  console.log(children[0], 'children.props')
  const {SessionID, ChangePasswordAtNextLogin} = children[0];
  // console.log(SessionID, 'test props')
  initialState['SessionID'] = SessionID;
  initialState['ChangePasswordAtNextLogin'] = ChangePasswordAtNextLogin;
  // console.log(initialState, 'initialState')
  const [inState, inSetState] = useState(initialState);
  
  return (
    <Context.Provider value={[inState, inSetState]}>{children[1]}</Context.Provider>
  )
}
export default Store;