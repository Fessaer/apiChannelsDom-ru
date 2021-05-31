import React, { useContext } from 'react';
import { Context } from '../Store';

export default function Home() {
  const [inState] = useContext(Context);
  let { count } = inState;
  return (
    <>
    <div>
      Users
    </div>
    <div>
      {count}
    </div>
    </>
  )
}
