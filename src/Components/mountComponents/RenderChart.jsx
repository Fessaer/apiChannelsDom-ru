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

  let { activeFilterChart } = globalState;
  let { elementsRechart } = globalState.fetch.chart;
  
  // useEffect(() => {
  //   inSetState({...globalState, toggleActivePage: 'chart'})
  //   console.log('useEffect')
  // }, [])
  
  const objClassID = {
    '1': 'Каска',
    '2': 'Куртка',
    '3': 'Штаны',
    '4': 'Всё'
  }

  if (elementsRechart === undefined) {
      elementsRechart = [];
  }

  const copyArrayData = [...elementsRechart]

  const bigNumberArray = copyArrayData.length
  > 0 ? Number(copyArrayData.sort((prev, next) =>
  prev[objClassID[activeFilterChart]] - next[objClassID[activeFilterChart]]).pop()[objClassID[activeFilterChart]]) : 0

  return (
    <>
      <ResponsiveContainer width="95.5%" height={600}>
        <BarChart data={elementsRechart}>
          <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="dateTime" />
          <YAxis tickCount={20} domain={[0, bigNumberArray]} padding={{ top: 20 }} interval={0}/>
          <Tooltip />
          <Legend />
          <Bar  dataKey='Каска' fill="#8884d8" />
          <Bar  dataKey='Куртка' fill="#82ca9d" />
          <Bar  dataKey='Штаны' fill="#ffb700" />
          <Bar  dataKey='Всё' fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}