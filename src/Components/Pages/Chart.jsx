import React from 'react';
import SearchBarChart from './SearchBarChart';
import RenderChart from '../mountComponents/RenderChart';
import '../Styles/searchBar.css';

export default function Chart() {
  return (
    <div className="container-fluid vh-90">
      <SearchBarChart />
      <RenderChart />
    </div>
  )
}
