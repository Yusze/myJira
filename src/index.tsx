import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
// import {loadDevTools} from 'jira-dev-tool'
/* 自定义antd的主题变量所引用 */
import 'antd/dist/antd.less'
import { AppProviders } from 'context';



loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
// loadDevTools(()=>ReactDOM.render(
//   <React.StrictMode>
//     <AppProviders>
//       <App />
//     </AppProviders>
//   </React.StrictMode>,
//   document.getElementById('root')
// ))



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
