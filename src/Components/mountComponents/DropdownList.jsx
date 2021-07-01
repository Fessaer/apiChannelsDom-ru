import React, { useContext } from 'react';
import { Context } from '../Store';
import allSelect from '../helpers/allSelect';
import { Col } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
const style = { display: 'flex', flexDirection: 'column', maxWidth: 220};

export default function DropdownList(props) {
  let { name, items, labelName } = props
  const [globalState, inSetState] = useContext(Context);
  let { fetch, toggleActivePage } = globalState;
  let { chart, report } = globalState.fetch

  if (items === undefined) console.log('не все параметры переданны для dropdown(items)');
  if (name === undefined) console.log('не все параметры переданны для dropdown(name)');
  const changeHandle = (e) => {
    if (e === 'Все объекты' || e === 'Все камеры') {
      if (toggleActivePage === 'chart') {
        chart = { ...chart, [name]: '' }
        fetch = { ...fetch, chart }
        inSetState({ ...globalState, fetch })
      }
      if (toggleActivePage === 'report') {
        report = { ...report, [name]: '' }
        fetch = { ...fetch, report }
        inSetState({ ...globalState, fetch })
      }
    } else {
      if (toggleActivePage === 'chart') {
        chart = { ...chart, [name]: e }
        fetch = { ...fetch, chart }
        inSetState({ ...globalState, fetch })
      }
      if (toggleActivePage === 'report') {
        report = { ...report, [name]: e }
        fetch = { ...fetch, report }
        inSetState({ ...globalState, fetch })
      }
    }
  }

  return (
    
    <Col className="gutter-row" sm={{ span: 6, push: 0}} xl={{ span: 4, push: 0}} style={style}>
      <label className="pb-1">{labelName}</label>
      <Select style={{ width: 200 }} onChange={changeHandle} defaultValue={items.map((item) => Object.values(item).join() === 'Все объекты'
      || Object.values(item).join() === 'Все камеры' 
      || Object.values(item).join() === 'Нестандартная спецодежда' ? Object.values(item).join() : null)}>
        {items.map((item) => {
          const key = Object.keys(item).join()
          const value = Object.values(item).join()
          // if (value === 'Все объекты' || value === 'Все камеры' || value === 'Нестандартная спецодежда') return <Option key={key}>{value}</Option>
          return (
            <Option key={key} value={allSelect(key, value)}>{value}</Option>
          )
        })}
      </Select>
    </Col>
  )
}
