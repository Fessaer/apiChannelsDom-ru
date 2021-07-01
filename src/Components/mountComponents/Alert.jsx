import React from 'react'
import { Col, Alert } from 'antd';


export default function AlertMessage() {
  return (
      <Col style={{marginTop: 20}} span={24}>
        <Alert message="События не найдены" type="warning" />
      </Col>
  )
}
