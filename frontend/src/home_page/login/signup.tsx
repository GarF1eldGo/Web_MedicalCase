import React from 'react';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import './login.css'
import axios from 'axios';
import { local } from 'd3';

export default function Signup() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const url = 'http://127.0.0.1:8080/api/user/signup';
    const history = useHistory();
    const hintRef = React.useRef<HTMLParagraphElement>(null);


    function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        // 判断是否为纯数字
        if(isNaN(Number(event.target.value))){
            hintRef.current!.style.display = 'inline-block';
            hintRef.current!.innerHTML = '账号需为纯数字';
        }else{
            // 判断是否为8位
            if(event.target.value.length !== 8){
                hintRef.current!.style.display = 'inline-block';
                hintRef.current!.innerHTML = '账号需为8位';
            }else{
                hintRef.current!.style.display = 'none';
                setUserName(event.target.value);
            }
        }
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        // 判断是否数字和字母
        if(!/^[A-Za-z0-9]+$/.test(event.target.value)){
            hintRef.current!.style.display = 'inline-block';
            hintRef.current!.innerHTML = '密码需为数字或字母';
        }else{
            // 判断是否为8-20位
            if(event.target.value.length < 8 || event.target.value.length > 20){
                hintRef.current!.style.display = 'inline-block';
                hintRef.current!.innerHTML = '密码需为8-20位';
            }else{
                hintRef.current!.style.display = 'none';
                setPassword(event.target.value);
            }
        }
    }
    function handlePassword2Change(event: React.ChangeEvent<HTMLInputElement>) {
        // 判断两次密码是否一致
        if(event.target.value !== password){
            hintRef.current!.style.display = 'inline-block';
            hintRef.current!.innerHTML = '两次密码不一致';
        }else{
            hintRef.current!.style.display = 'none';
            setPassword2(event.target.value);
        }
    }
    function handlePressEnter(){
        // 判断格式是否正确
        if (hintRef.current!.style.display === 'inline-block'){
            return;
        }
        console.log('userName: ', userName);
        console.log('password: ', password);
        // 判断是否都填写了
        if(userName && password && password2){
            axios.post(url, {       
                "username": encodeURIComponent(userName),
                "password": encodeURIComponent(password)
            }).then((res) => {
                console.log('res: ', res);
                if(res.data){
                    // 注册成功
                    hintRef.current!.style.display = 'inline-block';
                    hintRef.current!.style.color = 'green';
                    hintRef.current!.innerHTML = '注册成功, 即将跳转到登录页面';
                    setTimeout(() => {
                        history.push('/login');
                    }, 2000);
                }else{
                    hintRef.current!.style.display = 'inline-block';
                    hintRef.current!.innerHTML = '账号已存在';
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
                            <h1>用户注册</h1>
                            <p ref={hintRef} className='login-hint' style={{color:'red',height:'16px'}}></p>
                            <div className='login-form'>
                                
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>账号</div>
                                    <Input className='login-form-item-input' 
                                        onChange={handleUserNameChange}
                                        onPressEnter={handlePressEnter}
                                        placeholder='仅支持8位数字作为账号'/>
                                    
                                </div>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>密码</div>
                                    <Input.Password className='login-form-item-input'
                                        onChange={handlePasswordChange}
                                        onPressEnter={handlePressEnter}
                                        placeholder='密码需为8-20为数字或字母组合'/>
                                    
                                </div>
                                <div className='login-form-item'>
                                    <div className='login-form-item-label'>确认密码</div>
                                    <Input.Password className='login-form-item-input'
                                        onChange={handlePassword2Change}
                                        onPressEnter={handlePressEnter}
                                        placeholder='请再次输入密码'/>
                                    
                                </div>
                            </div>
                            <Button className='login-button' onClick={handlePressEnter}>注册</Button>
                            {/* <div className="signup-tips">
                                <span>没有账号? </span>
                                <span className='sign-up-btn'>注册</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
    )
}