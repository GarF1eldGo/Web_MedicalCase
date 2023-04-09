import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './dash_board/dash_board.tsx';
import TestDashboard from './dash_board/test/dash_board';
import UserPage from './user_page/user_page';
import Login from './home_page/login/login';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Switch> 
        <Route exact path="/" component={App} />
        <Route path="/Dashboard" component={TestDashboard} />
        <Route path="/test" component={Dashboard} />
        <Route path="/UserPage" component={UserPage} />
        <Route path="/Login" component={Login} />
        <Redirect from='/Home' to='/' />
      </Switch>
    </BrowserRouter>
);

