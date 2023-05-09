import './App.css';
import React from 'react';
import Home from './home_page/home_page.js';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import TestDashboard from './dash_board/test/dash_board';
import UserPage from './user_page/user_page';
import Login from './home_page/login/login';
import MyCirclePacking from './dash_board/classification/diease_classification';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch> 
        <Route exact path="/" component={Home} />
        <Route path="/Dashboard" component={TestDashboard} />
        <Route path="/test" component={MyCirclePacking} />
        <Route path="/UserPage" component={UserPage} />
        <Route path="/Login" component={Login} />
        <Redirect from='/Home' to='/' />
      </Switch>
    </BrowserRouter>
    </div>

    
  );
}

export default App;
