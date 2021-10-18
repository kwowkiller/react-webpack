import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
// import 'antd/dist/antd.min.css';

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
ReactDOM.hydrate(<App />, document.getElementById('root'));
