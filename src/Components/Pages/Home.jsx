import React, {useContext} from 'react';
import { Context } from '../Store';
import { Card, List } from 'antd';
import {
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';

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
      )
  } else {
    return null;
  }
};
