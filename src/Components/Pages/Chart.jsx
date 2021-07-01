import React from 'react';
import SearchBarChart from './SearchBarChart';
import RenderChart from '../mountComponents/RenderChart';
import '../Styles/searchBar.css';

const Chart = () => {
  return (
    <div>
      <SearchBarChart />
      <RenderChart />
    </div>
  )
}
export default Chart;