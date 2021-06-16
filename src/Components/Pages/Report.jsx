/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBarReport';
import DataPlate from '../mountComponents/RenderDataPlate';
import DataReactTable from '../mountComponents/RenderDataTable';
import Pagination from '../mountComponents/Paging';
// import Submit from '../mountComponents/Submit';
import Spinner from '../mountComponents/Spinner';
// var convert = require('xml-js');

export default function Reports() {
  const [globalState, inSetState] = useContext(Context);
  let { count } = globalState;

  return (
    <> 
      <SearchBar />
      <Spinner />
      <Pagination />
      <DataPlate />
      <DataReactTable />
      <Pagination />
    </>
  )
}
