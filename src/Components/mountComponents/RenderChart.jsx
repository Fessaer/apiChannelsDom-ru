/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import { colors } from '../config/configCharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function RenderChart(props) {
  const [globalState] = useContext(Context);
  let { activeFilterChart } = globalState.ui;
  let { elementsRechart } = globalState.fetch.chart;
  let { configs } = props;

  if (elementsRechart === undefined) {
    elementsRechart = [];
  }

  let copyArrayData = [...elementsRechart];

  const bigNumberArray =
    copyArrayData.length > 0
      ? copyArrayData
          .sort((prev, next) => {
            let newPrev = [];
            let newNext = [];
            Object.entries(prev).forEach(([, value]) => {
              if (!isNaN(Number(value))) newPrev.push(Number(value));
            });
            Object.entries(next).forEach(([, value]) => {
              if (!isNaN(Number(value))) newNext.push(Number(value));
            });
            const elPrev = newPrev.sort(function (a, b) {
              return a - b;
            });
            const elNext = newNext.sort(function (a, b) {
              return a - b;
            });
            const prevElement = elPrev.pop();
            const nextElement = elNext.pop();
            return prevElement - nextElement;
          })
          .pop()
      : 0;

  const bigNumber = (() => {
    let arrNums = [];
    Object.entries(bigNumberArray).forEach(([, value]) => {
      if (!isNaN(Number(value))) arrNums.push(Number(value));
    });
    if (arrNums.length > 0)
      return arrNums
        .sort(function (a, b) {
          return a - b;
        })
        .pop();
    if (arrNums.length === 0) return 0;
  })();

  const autoWidth = (num) =>
    num !== undefined && num !== 0
      ? Number(num.toString().length + '0') + 5
      : 0;

  function formatXAxis(tickItem) {
    function formatLocaleDate(str) {
      const d = str.substr(0, 2);
      const m = str.substr(3, 2);
      return `${d}/${m}`;
    }

    let strDate = formatLocaleDate(tickItem);

    if (
      tickItem !== '' &&
      elementsRechart.length > 7 &&
      tickItem !== undefined
    ) {
      return strDate;
    }

    if (
      tickItem !== '' &&
      elementsRechart.length <= 7 &&
      tickItem !== undefined
    ) {
      return tickItem;
    }

    if (tickItem === '' && tickItem === undefined) return '';
    return '';
  }

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={elementsRechart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="dateTime"
          tickFormatter={formatXAxis}
          domain={['', '']}
        />
        <YAxis
          tickCount={20}
          domain={[0, bigNumber]}
          padding={{ top: 20 }}
          interval={2}
          width={autoWidth(bigNumber)}
        />
        <Tooltip />
        <Legend />
        {configs.items.map((item, index) => {
          if (item !== 'dateTime' && activeFilterChart === '0') {
            return (
              <Bar
                key={item.ID + index.toString()}
                maxBarSize={200}
                dataKey={item.Name}
                fill={colors[index]}
              />
            );
          }
          if (item.ID === activeFilterChart && activeFilterChart !== '0') {
            return (
              <Bar
                key={item.ID + index.toString()}
                maxBarSize={200}
                dataKey={item.Name}
                fill={colors[index]}
              />
            );
          }
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
