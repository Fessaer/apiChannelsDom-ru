/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBar';
import DataPlate from '../mountСomponents/DataPlate';
import DataReactTable from '../mountСomponents/DataTable';
import Pagination from '../mountСomponents/Paging';
import Submit from '../mountСomponents/Submit';
import Spinner from '../mountСomponents/Spinner';
import FetchBindComponent from '../mountСomponents/FetchBindComponent';
var convert = require('xml-js');

export default function Reports() {
  const [globalState, inSetState] = useContext(Context);
  let { count } = globalState;
  return (
    <div className="container-fluid"> 
      {/* <SearchBar /> */}
      <FetchBindComponent />
      <Spinner />
      {/* <Pagination /> */}
      {/* <DataPlate /> */}
      {/* <DataReactTable /> */}
      {/* <Pagination /> */}
    </div>
  )
}
