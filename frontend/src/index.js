import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './dash_board/dash_board.tsx';
import {DemoCirclePacking} from './dash_board/circle.js'
import AddFile from './dash_board/upload_file/upload_file';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch> 
        {/* <Route path="*" component=  {<Home/>} /> */}
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/About" component={DemoCirclePacking} />
        <Route path="/Tutorial" component={Dashboard} />
        <Route path="/upload" component={AddFile} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

