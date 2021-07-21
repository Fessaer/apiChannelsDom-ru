import React, {useContext, useEffect} from 'react';
import { Context } from '../Store';
import { Button, Col, Row, Card } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import FormComponent from '../mountComponents/FormComponent';
import fetchFunction from '../mountComponents/Helpers/fetchFn';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  maxWidth: 220,
};

export default function CardPage({ history }) {
  const [globalState, inSetState] = useContext(Context);
  const historys = useHistory();

  useEffect(() => {
    if (globalState.channels === undefined) {
      historys.goBack()
    }
    
  }, [globalState.channels])


  const handleSearch = async () => {
    // async function dataFetch() {
    //   let url = 'https://epg.domru.ru/program/list';
    //     let form = new FormData()
    //     form.set('domain', 'perm')
    //     form.set('date_from', globalState.startDate)
    //     form.set('date_to', globalState.endDate)
    //     form.set('xvid', [3783])
    //     // console.log(resp, 'resp')
    //     await fetch(url, {
    //       method: 'POST',
    //       body: new URLSearchParams("date_from=2021-05-18+00%3A00%3A00&date_to=2021-05-19+00%3A00%3A00&xvid[0]=15&domain=perm")
    //       // JSON.stringify({
    //       //   'domain': 'perm',
    //       //   'date_from': globalState.startDate,
    //       //   'date_to': globalState.endDate,
    //       //   'xvid': [3783]
    //       // }),
        
    //     }).then((response) => {
    //       console.log(response.json())
    //       return response.json();
    //     }).then((data) => setData({data}))
    //   }
    //   dataFetch()
    const body = 'date_from=2021-05-18 00:00:00&date_to=2021-05-19 00:00:00&xvid[0]=3783&domain=perm'
    fetchFunction('POST', 'https://epg.domru.ru/program/list', body)
  }

  return (
    <div style={{padding: 15}}>
      <div id="chart-search-bar">
        <Row justify="start" gutter={8}>
        <Col className="gutter-row"
      xs={{ span: 6, push: 0 }}
      sm={{ span: 3, push: 0 }}
      xl={{ span: 2, push: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      <label>&nbsp;</label>
          <Button onClick={() => historys.goBack()}>Back</Button>
          </Col>
        <FormComponent />
      <Col 
      className="gutter-row"
      xs={{ span: 6, push: 0 }}
      sm={{ span: 3, push: 0 }}
      xl={{ span: 2, push: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      <label>&nbsp;</label>
          <Button onClick={handleSearch}>Поиск</Button>
          </Col>
        </Row>
      </div>
    
    </div>
  )
}
