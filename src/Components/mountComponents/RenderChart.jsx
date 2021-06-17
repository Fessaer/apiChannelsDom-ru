import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import { BarChart,
  Bar,
  XAxis,
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend } from 'recharts';

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
    '4': 'Все классы'
  }

  if (elementsRechart === undefined) {
      elementsRechart = [];
  }
  if (activeFilterChart === "") activeFilterChart = '4'
  let copyArrayData = [...elementsRechart]

  const bigNumberArray = copyArrayData.length
  > 0 ? Number(copyArrayData.sort((prev, next) =>
  prev[objClassID[activeFilterChart]] - next[objClassID[activeFilterChart]]).pop()[objClassID[activeFilterChart]]) : 0
  
  const autoWidth = (arr) => {
    if (arr.length === 0) return 0
    let arrLength = []
    arr.forEach((item) => {
      if(item !== undefined) arrLength.push(Number(item[objClassID[activeFilterChart]]))
    })
    if (arrLength.length > 0) arrLength.sort((prev, next) => Number(prev) - Number(next))
    let resultArr = arrLength[arrLength.length - 1]
    return Number(resultArr.toString().length + '0') + 10
  }

  return (
    <div className="me-0">
      <ResponsiveContainer width="95.5%" height={600}>
        <BarChart data={elementsRechart}>
          <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="dateTime" domain={[0, 0]} />
          <YAxis tickCount={20} domain={[0, bigNumberArray]}
              padding={{ top: 20 }} interval={0} width={autoWidth(elementsRechart)}/>
          <Tooltip />
          <Legend />
          <Bar  dataKey='Каска' fill="#8884d8" />
          <Bar  dataKey='Куртка' fill="#82ca9d" />
          <Bar  dataKey='Штаны' fill="#ffb700" />
          <Bar  dataKey='Все классы' fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}