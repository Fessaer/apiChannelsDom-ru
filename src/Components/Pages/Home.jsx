import React, {useContext} from 'react';
import { Context } from '../Store';
import { Col, Row, Card, List, Avatar, Space } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  browserHistory,
  useHistory,
} from 'react-router-dom';
import CardPage from './CardPage';

const style = {
  display: 'flex',
  width: '100%',
  minWidth: 260,
  border: 'solid 1px #D3D3D3',
  borderRadius: 5,
  margin: '1px',
  paddingLeft: '5px',
};

export default function Home() {
  const [globalState, inSetState] = useContext(Context);
  const history = useHistory();
  let { channels } = globalState;
  if (channels !== undefined) {
    return (
      <div style={{margin: '5px 14px', paddingBottom: 14}}>
      <List
      grid={{
        gutter: [14, 14],
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      itemLayout="horisontal"
      size="large"
      pagination={{
        showSizeChanger: false,
        pageSize: 20,
        
      }}
      style={{marin: "14px"}}
      dataSource={channels}
      renderItem={item => (
          // <Col
          //   key={item.chid}
          //   className="gutter-row"
          //   xs={{ span: 24, push: 0 }}
          //   sm={{ span: 12, push: 0 }}
          //   md={{ span: 12, push: 0 }}
          //   lg={{ span: 8, push: 0 }}
          //   xl={{ span: 6, push: 0 }}
          // >
            <Card
              onClick={()=> history.push({pathname: `/CardPage`, props: {...item}})}
              hoverable={true}
              bordered={true}
              style={{ width: 'auto', margin: '0px 5px' }}
              bodyStyle={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                height: '400px'
              }}
            >
              <h1>{item.title}</h1>
              <div>
                <img
                  style={{float: 'left', margin: '0px 10px 0px 0px'}}
                  className="photo"
                  src={'https://epg.domru.ru' + item.logo}
                  alt="altImage"
                />
                <p>{item.description}</p>
              </div>
            </Card>)}
            />
      </div>
      //   )})}
      // </Row>
    )
  } else {
    return null
  }
}
