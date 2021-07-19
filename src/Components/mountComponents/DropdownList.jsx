/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Context } from '../Store';
import { Col } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  maxWidth: 220,
};

export default function DropdownList(props) {
  let { configs } = props;
  const [globalState, inSetState] = useContext(Context);
  let { fetch, toggleActivePage, ui } = globalState;
  let { chart, report } = globalState.fetch;
  const { type } = configs;

  const changeHandle = (e) => {
    if (toggleActivePage === 'chart') {
      chart = { ...chart, [type]: e };
      fetch = { ...fetch, chart };
      inSetState({ ...globalState, ui, fetch });
    }
    if (toggleActivePage === 'report') {
      report = { ...report, [type]: e };
      fetch = { ...fetch, report };
      inSetState({ ...globalState, ui, fetch });
    }
  };

  return (
    <Col
      className="gutter-row"
      sm={{ span: 6, push: 0 }}
      xl={{ span: 4, push: 0 }}
      style={style}
    >
      <label>{configs.label}</label>
      <Select
        style={{ width: 200 }}
        onChange={changeHandle}
        defaultValue={configs.items.map((item) =>
          item.ID === '0' || item.ID === '552' ? item.Name : null
        )}
      >
        {configs.items.map((item) => {
          return (
            <Option key={item.ID} value={item.ID}>
              {item.Name}
            </Option>
          );
        })}
      </Select>
    </Col>
  );
}
