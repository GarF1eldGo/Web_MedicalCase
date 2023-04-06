import React, { useEffect } from 'react'
import { GithubOutlined, AndroidOutlined } from '@ant-design/icons';
import { Space, Input, Avatar, Divider} from 'antd';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';

import './dash_board.css'
import slash from '../../attachment/img/slash.png'


export default function FrameWork(props:any){
    const [showOptions, setShowOptions] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [showIcon, setShowIcon] = React.useState(true);
    const [preWidth, setPreWidth] = React.useState(0);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        // 初始化输入框宽度
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        console.log('preWidth: ', preWidth);
        console.log('match path : ', match.path);
    }, []);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handlePressUser(event: React.KeyboardEvent<HTMLInputElement>){
        console.log('user input : ', inputValue);
    }

    function handleUserClick(){
        setShowOptions(!showOptions);
    }

    // 更改输入框宽度
    function handleOnFocus(){
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        const newWidth = preWidth + 80;
        document.getElementsByClassName('search-input')[0].setAttribute('style', 'width: ' + newWidth + 'px');
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>){
        if(event.target.value === ''){
            setShowIcon(true);
            document.getElementsByClassName('search-input')[0].setAttribute('style', 'width: ' + preWidth + 'px');
        }
    }

    return (
        <div>
            <Header className='header'>
                <Space className='space-container' style={{width:'100%', height:'100%'}}>
                    <GithubOutlined className="logo" style={{color:'white', fontSize:24, height:'100%'}}/>
                    <div className='search-container'>
                        <Input  className="search-input" 
                            addonBefore={null} placeholder="Please input"
                            value={inputValue} onChange={handleInputChange}  
                            onPressEnter={handlePressUser}
                            onClick={() => setShowIcon(false)}
                            onBlur={handleOnBlur}
                            onFocus={handleOnFocus}
                        />
                        <div className='suffix-container'>
                            {showIcon && <img className='suffix-img' src={slash} alt="slash" />}
                        </div>
                    </div>
                    
                    <div className='nav' >
                        <a onClick={() => {history.push('/test/RecordList')}}>Document Search</a>
                        <a onClick={() => {history.push('/test/Classification')}}>Classification</a>
                        <a onClick={() => {history.push('/test/AddFile')}}>Import Documents</a>
                    </div>
                </Space>

                <div className='avatar-container' onClick={handleUserClick}>
                    <Avatar className='user-avatar' icon={<AndroidOutlined/>} />
                </div>

                {showOptions && 
                    <div className='user-options'>
                        <p onClick={() => {history.push('/UserPage')}}>Signed in as </p>
                        <p onClick={() => {history.push('/UserPage')}} style={{fontWeight:'bold'}}>GarField</p>
                        <Divider />
                        <p>Profile</p>
                        <p>Settings</p>
                        <Divider />
                        <p>Sign out</p>
                    </div>}
            </Header>

            <Content className='content-container'>
                {props.displayContent}
            </Content>

        </div>
    )
}