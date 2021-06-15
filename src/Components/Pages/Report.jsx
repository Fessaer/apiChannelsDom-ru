/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBar';
import DataPlate from '../mountComponents/DataPlate';
import DataReactTable from '../mountComponents/DataTable';
import Pagination from '../mountComponents/Paging';
import Submit from '../mountComponents/Submit';
import Spinner from '../mountComponents/Spinner';
import FetchBindComponent from '../mountComponents/FetchBindComponent';
var convert = require('xml-js');

export default function Reports() {
  const [globalState, inSetState] = useContext(Context);
  let { count } = globalState;
  return (
    <> 
      <SearchBar />
      {/* <FetchBindComponent /> */}
      <Spinner />
      <Pagination />
      {/* <DataPlate /> */}
      <DataReactTable />
      <Pagination />
    </>
  )
}
