import React from 'react';
import { Button, Input } from 'antd';
import backgroundImg from '../../attachment/img/login-bg.jpg';

import './login.css'

export default function Login() {
    return (
        <div className='whole-page-container'>
            <div className='login-wrapper'>
                <div className='login-container'>
                    <div className='left-container'>
                        {/* <img className='background-img' src={backgroundImg} /> */}
                        <div className='login-slogan-container'>
                            <div className='header-info'>
                                THE SPACE NETWORK
                            </div>
                            <h1 className='title-info'>
                                Explore The Universe
                            </h1>
                            <div className='sub-title-info'>
                                <span>5 Million+ people have joined our network.</span>
                                <span>we invite you to join the tribe.</span>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='right-form-container'>
                            <h1>Log in</h1>
                            <div className='login-form'>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>Username</div>
                                    <Input className='login-form-item-input' placeholder='Enter user name'/>
                                </div>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>Password</div>
                                    <Input.Password className='login-form-item-input' placeholder='Enter password'/>
                                    
                                </div>
                            </div>
                            <Button className='login-button'>Log in</Button>
                            <div className="signup-tips">
                                <span>Don't Have An Account? </span>
                                <span className='sign-up-btn'>Signup</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
    )
}