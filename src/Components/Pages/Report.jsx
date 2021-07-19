/* eslint-disable no-unused-vars */
import React from 'react';
import SearchBar from './SearchBarReport';
import DataPlate from '../mountComponents/RenderDataPlate';
import DataReactTable from '../mountComponents/RenderDataTable';
import Pagination from '../mountComponents/Paging';
import Spinner from '../mountComponents/Spinner';
import { Row } from 'antd';
import { configParam } from '../config/fetch/config';

export default function Reports() {
  return (
    <>
      <SearchBar />
      <Row style={{ marginRight: 16 }}>
        <Spinner />
        <Pagination />
        {/* <DataReactTable /> */}
        <DataPlate configs={configParam.Algorithm} />
        <Pagination norender={15} />
      </Row>
    </>
  );
}
