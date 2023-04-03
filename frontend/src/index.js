import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './dash_board/dash_board.tsx';
import {DemoCirclePacking} from './dash_board/circle.js'
import AddFile from './dash_board/upload_file/upload_file';
import RecordRead from './dash_board/record_list/record_read'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Switch> 
        <Route exact path="/" component={App} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/About" component={DemoCirclePacking} />
        <Route path="/upload" component={AddFile} />
        <Route path="/record_detail" component={RecordRead} />
      </Switch>
    </BrowserRouter>
  // </React.StrictMode>
);

