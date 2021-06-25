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

export default function RenderChart(props) {
  const [globalState] = useContext(Context);

  let { activeFilterChart } = globalState.ui;
  let { elementsRechart } = globalState.fetch.chart;

  // useEffect(() => {
  //   inSetState({...globalState, toggleActivePage: 'chart'})
  //   console.log('useEffect')
  // }, [])

  const objClassID = {
    '1': 'Каска',
    '2': 'Куртка',
    '3': 'Штаны',
    '4': 'Все объекты'
  }

  if (elementsRechart === undefined) {
    elementsRechart = [];
  }
  if (activeFilterChart === "") activeFilterChart = '4'
  let copyArrayData = [...elementsRechart]

  const bigNumberArray = copyArrayData.length
    > 0 ? Number(copyArrayData.sort((prev, next) =>
      prev[objClassID[activeFilterChart]] - next[objClassID[activeFilterChart]]).pop()[objClassID[activeFilterChart]]) : 0
  // console.log(elementsRechart)
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
  // console.log(window.navigator.userAgent)
  function formatXAxis(tickItem) {
    // console.log(new Date(tickItem))
    // console.log(formatDateToLocale(new Date(tickItem), 'mm\.dd\.yyyy'))
    // console.log(moment(formatDateToLocale(tickItem, 'dd.mm.yyyy')).format('LLLL'))
    // If using moment.js
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
      const g = str.substr(6, 4)
      return `${d}/${m}`
    }

    let strDate = formatLocaleDate(tickItem)
    // let newStrDate = strDate
    // console.log(moment(strDate, 'minutes'))
    // console.log(elementsRechart.length);
    const dayString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('dddd')
    const monthString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('MMM')
    const ddString = moment(formatDateToLocale(new Date(tickItem), 'dd.mm.yyyy')).format('DD')
    const returnRefactoringDay = `${mappingDay[dayString]}, ` + ddString + ' ' + mappingMonth[monthString]
    // if(tickItem !== "" && tickItem !== undefined) console.log(returnRefactoringDay)
    if(tickItem !== "" && elementsRechart.length > 7 && tickItem !== undefined) return strDate//formatDateToLocale(new Date(`${strDate}T15:00:48`), 'mm\.dd\.yyyy')//formatDateToLocale(new Date(newStrDate))
    if(tickItem !== "" && elementsRechart.length <= 7 && tickItem !== undefined) return returnRefactoringDay
    if(tickItem === "" && tickItem === undefined) return ""
    return ''
    }

  // if(elementsRechart.length > 0 ) console.log(Object.entries(elementsRechart[0]), activeFilterChart )
  return (
    <div className="me-0">
      <ResponsiveContainer width="95.5%" height={(() => {
        const pageWidth = document.documentElement.scrollWidth
        // console.log(pageWidth)
        const height = pageWidth / 2
        // console.log(height)
        if (height > 790) return 600
        if (height > 790) return 500
        if (height < 300) return 300
        return height })()}>
        <BarChart data={elementsRechart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTime" tickFormatter={formatXAxis}  domain={["", ""]} />
          <YAxis tickCount={20} domain={[0, bigNumberArray]}
            padding={{ top: 20 }} interval={2} width={autoWidth(elementsRechart)} />
          <Tooltip />
          <Legend />
          {activeFilterChart !== '4' && activeFilterChart !== '1' ? null : <Bar maxBarSize={200} dataKey='Каска' fill={activeFilterChart !== '4' ? colors[0] : colors[0]} />}
          {activeFilterChart !== '4' && activeFilterChart !== '2' ? null : <Bar maxBarSize={200} dataKey='Куртка' fill={activeFilterChart !== '4' ? colors[0] : colors[1]} />}
          {activeFilterChart !== '4' && activeFilterChart !== '3' ? null : <Bar maxBarSize={200} dataKey='Штаны' fill={activeFilterChart !== '4' ? colors[0] : colors[2]} />}
          {activeFilterChart !== '4' && activeFilterChart !== '4' ? null : <Bar maxBarSize={200} dataKey='Все объекты' fill={activeFilterChart !== '4' ? colors[0] : colors[3]} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}