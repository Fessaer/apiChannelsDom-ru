import React from 'react'
import { Button, Col, Row, Card } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

export default function CardPage(props) {
  console.log(props)
  const history = useHistory();
  const handleBack = () => {

  }

  return (
    <div>
      <form>
      <Button onClick={() => history.goBack()}>Back</Button>
      <div id="chart-search-bar">
        <Row justify="start" gutter={8}>
        </Row>
      </div>
    </form>
    </div>
  )
}
