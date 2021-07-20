import React, {useContext} from 'react';
import { Context } from '../Store';
import { Col, Row, Card } from 'antd';

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
      <Row
        gutter={[8, 8]}
        justify="space-between"
        style={{
          display: 'flex',
          padding: '12px',
          paddingBottom: '12px',
          justifyContent: 'flex-start',
        }}
      >
        {channels.map((item, index) => {
          console.log(item)
        return (
          <Col
            key={item.chid}
            className="gutter-row"
            xs={{ span: 24, push: 0 }}
            sm={{ span: 12, push: 0 }}
            md={{ span: 12, push: 0 }}
            lg={{ span: 8, push: 0 }}
            xl={{ span: 6, push: 0 }}
          >
            <Card
              onClick={()=> history.push({pathname: `/CardPage`, props: {...item}})}
              hoverable={true}
              bordered={true}
              style={{ width: 'auto' }}
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
            </Card>
          </Col>
        )})}
      </Row>
    )
  } else {
    return null
  }
}
