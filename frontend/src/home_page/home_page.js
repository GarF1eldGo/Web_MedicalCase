import React from 'react';
import {Image} from "react-native";
import './home_page.css';

import background_image from "../attachment/img/login.jpg";

export default function Home() {
  return (
    <div className="Home">
      <ul className='navigator'>
        <button className='home-button'>Home</button>
        <li><a href='/Dashboard'>Tutorial</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/Login">Log In</a></li>
      </ul>

      <div className='background_image'>
        <Image source={background_image}
        style={{resizeMode: "stretch",
           height:window.innerHeight,
           width:window.innerWidth}} />
      </div>
    </div>
  );
}