import React from 'react';
import {Image} from "react-native";
import './home_page.css';

import background_image from "./home_background.png";

export default function Home() {
  return (
    <div className="Home">
      <ul className='navigator'>
        <button>Home</button>
        <li><a href='/Tutorial'>Tutorial</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/login">Log In</a></li>
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