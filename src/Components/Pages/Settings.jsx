// import React from 'react'
import React, { useContext } from 'react';
import { Context } from '../Store';


export default function Settings() {
  const [inState, inSetState] = useContext(Context);
  let { count } = inState;
  const buttonHabdler = () => {
    console.log(inState, 'state button')
    count = count + 1;
    // inSetState({...inState, count})
  }
  return (
    <div>
      <div>{count}</div>
      <div>Setting</div>
      <button type="button" className="btn btn-primary btn-lg btn-block" onClick={buttonHabdler}>Block level button</button>
    </div>
  )
}
