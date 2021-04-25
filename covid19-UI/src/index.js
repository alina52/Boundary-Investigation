import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/base.css';
import './assets/css/style.css';
import reportWebVitals from './reportWebVitals';
import Router from './routers/Routers';
// require ('./mock/index.js')
ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
