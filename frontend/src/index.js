import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './dash_board/dash_board.tsx';
import RecordList from './dash_board/record_list/record_list';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Switch> 
        <Route exact path="/" component={App} />
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
);

