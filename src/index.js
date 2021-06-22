import React from 'react';
import ReactDOM from 'react-dom';
import './Components/Styles/index.css';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'date-input-polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

ReactDOM.render(
    <App />
  ,
  document.getElementById('root-report')
);

