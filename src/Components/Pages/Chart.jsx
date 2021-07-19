import React from 'react';
import SearchBarChart from './SearchBarChart';
import RenderChart from '../mountComponents/RenderChart';
import Spinner from '../mountComponents/Spinner';
import { Col, Row } from 'antd';
import { configParam } from '../config/fetch/config';

const Chart = () => {
  return (
    <div>
      <SearchBarChart />
      <Row style={{ marginTop: 16 }}>
        <Col
          xs={{ span: 24, push: 0 }}
          sm={{ span: 18, push: 0 }}
          xl={{ span: 18, push: 0 }}
        >
          <Spinner left={'50'} />
          <RenderChart configs={configParam.query.ClassID.formElementProps} />
        </Col>
      </Row>
    </div>
  );
};
export default Chart;
