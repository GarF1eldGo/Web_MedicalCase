import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './home_page/home_page.js';
import Main from './dash_board/dash_board.js';
import {DemoCirclePacking} from './dash_board/circle.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Home /> */}
        {/* <Main /> */}
        <DemoCirclePacking />
      </header>
    </div>
  );
}

export default App;
