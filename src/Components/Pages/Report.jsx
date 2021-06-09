/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBar';
import DataPlate from '../mountСomponents/DataPlate';
import DataReactTable from '../mountСomponents/DataTable';
import Pagination from '../mountСomponents/Paging';
import Submit from '../mountСomponents/Submit';
var convert = require('xml-js');

export default function Users() {
  const [inState, inSetState] = useContext(Context);
  let { count } = inState;
  return (
    <div className="container-fluid"> 
    <SearchBar props={ <Submit /> }/>
    <Pagination />
    {/* <DataPlate /> */}
    <DataReactTable />
    <Pagination />
    </div>
  )
}
