import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { Table, Tag, Space } from 'antd';
import format from './helpers/functionFormatReplaceDate';
var _ = require('lodash');

let dateInline;

const columns = [
  
  {
    title: 'Передача',
    dataIndex: 'title',
    key: _.uniqueId(),
  },
  {
    title: 'Описание',
    dataIndex: 'desc',
    key: _.uniqueId(),
  },
  {
    title: 'Начало',
    dataIndex: 'start',
    key: _.uniqueId(),
    render: start => {
      dateInline = start;
      return (
      <div key={_.uniqueId()}>
        {format(new Date(start), 'dd.mm.yyyy hh:MM:ss')}
      </div>
      )
    }
  },
  {
    title: 'Продолжительность',
    dataIndex: 'duration',
    key: _.uniqueId(),
    render: duration => (
      <div key={_.uniqueId()}>
        {(() => {
          if (new Date(dateInline).getTime() < new Date().getTime()) {
            if (duration*1000 + new Date(dateInline).getTime() > new Date().getTime()) {
              return (
                <>
                  <Tag color="green">идёт</Tag>
                  <br/>
                </>
              )
            }
            return <Tag color="magenta">закончилась</Tag>
          } else {
            return (
              <>
                <Tag color="purple">скоро</Tag>
                <br/>
              </>
            )
          }
        })()}
        {new Date(duration*1000).toUTCString().split(/ /)[4]}
      </div>
    )
  },
];


export default function ProgramTable({ channel, programList }) {
  const [globalState, inSetState] = useContext(Context);

  return (
    <Table dataSource={programList[channel]} columns={columns} rowKey={_.uniqueId()} />
  )
}
