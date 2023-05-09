import React from 'react';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import './login.css'
import axios from 'axios';
import { local } from 'd3';

export default function Login() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const url = 'http://127.0.0.1:8080/api/user/login';
    const history = useHistory();
    const hintRef = React.useRef<HTMLParagraphElement>(null);

    function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function handlePressEnter(){
        // 判断是否都填写了
        if(userName && password){
            axios.post(url, {       
                "username": encodeURIComponent(userName),
                "password": encodeURIComponent(password)
            }).then((res) => {
                if(res.data){// 登录成功
                    console.log('res: ', res);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('password', res.data.password);
                    localStorage.setItem('userID', res.data.userID);
                    localStorage.setItem('isAdmin', res.data.isAdmin);
                    history.push('/Dashboard/RecordList');
                }else{
                    hintRef.current!.style.display = 'block';
                    hintRef.current!.innerHTML = '用户名或密码错误，请重试';
                }
            }).catch((err) => {
                console.log('err: ', err);
            })
        }
    }

    return (
        <div className='whole-page-container'>
            <div className='login-wrapper'>
                <div className='login-container'>
                    <div className='left-container'>
                        {/* <img className='background-img' src={backgroundImg} /> */}
                        <div className='login-slogan-container'>
                            <div className='header-info'>
                                中医医案<br/>
                                阅读系统
                            </div>
                            <h1 className='title-info'>
                            人以天地之气生<br/>
                            四时之法成
                            </h1>
                            <div className='sub-title-info'>
                                <span>不治已病治未病，不治已乱治未乱</span>
                                <span>春夏养阳，秋冬养阴</span>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='right-form-container'>
                            <h1>用户登录</h1>
                            <p ref={hintRef} className='login-hint' style={{color:'red',height:'16px'}}></p>
                            <div className='login-form'>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>账号</div>
                                    <Input className='login-form-item-input' 
                                        onChange={handleUserNameChange}
                                        onPressEnter={handlePressEnter}
                                        placeholder='Enter user name'/>
                                </div>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>密码</div>
                                    <Input.Password className='login-form-item-input'
                                        onChange={handlePasswordChange}
                                        onPressEnter={handlePressEnter}
                                        placeholder='Enter password'/>
                                    
                                </div>
                            </div>
                            <Button className='login-button' onClick={handlePressEnter}>登录</Button>
                            <div className="signup-tips">
                                <span>没有账号? </span>
                                <span className='sign-up-btn'>注册</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
    )
}