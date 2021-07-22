import React, {useContext, useEffect} from 'react';
import { Context } from '../Store';
import { Button, Col, Row } from 'antd';
import {
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import FormComponent from '../mountComponents/FormComponent';
import ProgramTable from '../mountComponents/ProgramTable';

export default function CardPage({ history }) {
  const [globalState, inSetState] = useContext(Context);
  const historys = useHistory();
  const { props } = history.location 

  useEffect(() => {
    if (globalState.channels === undefined) {
      historys.goBack()
    }
    
  }, [globalState.channels])

  const handleSearch = async () => {
    async function dataFetch() {
      let url = 'https://epg.domru.ru/program/list?';
        let urlSearch = new URLSearchParams(
          {
            'domain': 'perm',
            'date_from': globalState.startDate,
            'date_to': globalState.endDate,
            'xvid': [props.xvid]
          })
        await fetch(url + urlSearch)
        .then((response) => response.text())
        .then((data) => JSON.parse(data))
        .then((programList) => {
          if (globalState.programList === undefined) {
            return inSetState({...globalState, programList});
          } else {
            return inSetState({...globalState, programList: { ...globalState.programList, ...programList }});
          }
        })
        .catch((e) => console.log(e))
      }
    dataFetch();
  }

  return (
    <div style={{padding: 15}}>
      <div id="chart-search-bar">
        <Row justify="start" gutter={8}>
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
          {globalState.programList !== undefined  && globalState.programList[props['xvid']] !== undefined ? <ProgramTable channel={props['xvid']} programList={globalState.programList} /> : null}
        </Row>
      </div>
    </div>
  )
};
