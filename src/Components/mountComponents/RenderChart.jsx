/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import {colors} from '../config/configCharts';
import moment from 'moment';
import formatDateToLocale from '../helpers/functionFormatReplaceDate'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
let _ = require('lodash');

export default function RenderChart(props) {
  const [globalState] = useContext(Context);
  let { activeFilterChart } = globalState.ui;
  let { elementsRechart } = globalState.fetch.chart;
 
  const objClassID = {
    '1': 'Каска',
    '2': 'Куртка',
    '3': 'Штаны',
    '': 'Все объекты'
  }

  if (elementsRechart === undefined) {
    elementsRechart = [];
  }

  if (activeFilterChart === "") activeFilterChart = ''
  let copyArrayData = [...elementsRechart]
  let copyArrayDataRenderBar = [...elementsRechart]
  const bigNumberArray = copyArrayData.length
    > 0 ? Number(copyArrayData.sort((prev, next) =>
      prev[objClassID[activeFilterChart]] - next[objClassID[activeFilterChart]]).pop()[objClassID[activeFilterChart]]) : 0
  const autoWidth = (arr) => {
    if (arr.length === 0) return 0
    let arrLength = []
    arr.forEach((item) => {
      if (item !== undefined) arrLength.push(Number(item[objClassID[activeFilterChart]]))
    })
    if (arrLength.length > 0) arrLength.sort((prev, next) => Number(prev) - Number(next))
    let resultArr = arrLength[arrLength.length - 1]
    return Number(resultArr.toString().length + '0') + 10
  }

  function formatXAxis(tickItem) {
    
    const mappingDay = {
      "понедельник": "Пн",
      "вторник": "Вт",
      "среда": "Ср",
      "четверг": "Чт",
      "пятница": "Пт",
      "суббота": "Сб",
      "воскресенье": "Вс"
    }

    const mappingMonth = {
      'январь': 'янв',
      'февраль': 'фев',
      'март': 'мар',
      'апрель': 'апр',
      'май': 'май',
      'июнь': 'июн',
      'июль': 'июл',
      'август': 'авг',
      'сентябрь': 'Сен',
      'октябрь': 'окт',
      'ноябрь': 'Ноя',
      'декабрь': 'Дек'
    };

    function formatLocaleDate(str) {
      const d = str.substr(0, 2)
      const m = str.substr(3, 2)
      return `${d}/${m}`
    }

    let strDate = formatLocaleDate(tickItem)
    const dayString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('dddd')
    const monthString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('MMM')
    const ddString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('DD')
    const returnRefactoringDay = `${mappingDay[dayString]}, ` + ddString + ' ' + mappingMonth[monthString]
    if(tickItem !== "" && elementsRechart.length > 7 && tickItem !== undefined) return strDate
    if(tickItem !== "" && elementsRechart.length <= 7 && tickItem !== undefined) return returnRefactoringDay
    if(tickItem === "" && tickItem === undefined) return ""
      return ''
    }
    const keysData = copyArrayDataRenderBar.map((item) => {
      return Object.keys(item)
      })
    const uniqueElemBar = [...new Set(...keysData)]
    let countColor = 0
  return (
    <div className="me-0 col-xl-9">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={elementsRechart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTime" tickFormatter={formatXAxis}  domain={["", ""]} />
          <YAxis tickCount={20} domain={[0, bigNumberArray]}
            padding={{ top: 20 }} interval={2} width={autoWidth(elementsRechart)} />
          <Tooltip />
          <Legend />
          {uniqueElemBar.map((item) => {
              if (item !== "dateTime" && (activeFilterChart === '' || objClassID[activeFilterChart] === item)) {
                  countColor = countColor + 1;
                  return <Bar  key={_.uniqueId()} maxBarSize={200} dataKey={item} fill={colors[countColor - 1]} />
              }
            })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}