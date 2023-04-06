import React from 'react';
import { Button, Input } from 'antd';
import backgroundImg from '../../attachment/img/login-bg.jpg';

import './login.css'

export default function Login() {
    return (
        <div className='whole-page-container'>
            <div className='login-container'>
                <div className='left-container'>
                    <img className='background-img' src={backgroundImg} />
                    <div className='login-slogan-container'>
                        <span className='header-info'>
                            THE SPACE NETWORK
                        </span>
                        <div className='title-info'>
                            Explore The Universe
                        </div>
                        <div className='sub-title-info'>
                            5 millions people have joined our network.
                        </div>
                    </div>
                </div>
                <div className='right-container'>
                    <div className='login-title'>Log in</div>
                    <div className='login-form'>
                        <div className='login-form-item'>
                            <div className='login-form-item-label'>Username</div>
                            <Input className='login-form-item-input' />
                        </div>
                        <div className='login-form-item'>
                            <div className='login-form-item-label'>Password</div>
                            <Input className='login-form-item-input' />
                        </div>
                    </div>
                    <Button className='login-button' type='primary'>Log in</Button>
                </div>
            </div>
        </div>
 
    )
}