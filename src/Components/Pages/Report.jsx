/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Context } from '../Store';
import SearchBar from './SearchBarReport';
import DataPlate from '../mountComponents/RenderDataPlate';
import DataReactTable from '../mountComponents/RenderDataTable';
import Pagination from '../mountComponents/Paging';
import Spinner from '../mountComponents/Spinner';

export default function Reports() {
  const [globalState, inSetState] = useContext(Context);

  return (
    <>
      <SearchBar />
      <Spinner />
      <Pagination />
      <DataPlate />
      <Pagination norender={15}/>
    </>
  )
}
