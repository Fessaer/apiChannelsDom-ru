import React from 'react';
import SearchBarChart from './SearchBarChart';
import RenderChart from '../mountComponents/RenderChart';
import '../Styles/searchBar.css';

const Chart = () => {
  console.log('render Chart')
  return (
    <div className="container-fluid vh-90 ps-0">
      <SearchBarChart />
      <RenderChart />
    </div>
  )
}
export default Chart;