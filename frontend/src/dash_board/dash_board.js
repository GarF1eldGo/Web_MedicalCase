import React from 'react';
import './dash_board.css';

import import_medical_case from "./import_medical_case.png";
import classification from "./classification.png";

export default function Dashboard(){
    return (
        <div className='Dashboard'>
            <ul className='sideNav'>
                <button><img src={import_medical_case} width="30" height="30" alt=""></img></button>
                <button><img src={classification} width="30" height="30" alt=""></img></button>
            </ul>
        </div>
    )
}