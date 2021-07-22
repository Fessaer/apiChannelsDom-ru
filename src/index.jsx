import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import "core-js/stable";
import "regenerator-runtime/runtime";
require('es6-promise').polyfill();
require('fetch-everywhere');
require('fetch-polyfill');

import 'antd/dist/antd.css';

ReactDOM.render(<App />, document.getElementById('root-report'));
