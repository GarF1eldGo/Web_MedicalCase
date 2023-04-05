import React, { useEffect } from 'react'
import { GithubOutlined, AndroidOutlined } from '@ant-design/icons';
import { Space, Input, Avatar, Divider} from 'antd';
import { Link } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';

import './dash_board.css'
import slash from '../../attachment/img/slash.png'

export default function TestDashboard(){
    const [showOptions, setShowOptions] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [showIcon, setShowIcon] = React.useState(true);
    const [preWidth, setPreWidth] = React.useState(0);

    useEffect(() => {
        // 初始化输入框宽度
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        console.log('preWidth: ', preWidth);
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

    function handleOnFocus(){
        // 更改输入框宽度
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
                        <Link to='/hhh'>Document Search</Link>
                        <Link to='/aaa'>Classification</Link>
                        <Link to='/bbb'>Import Documents</Link>
                    </div>
                </Space>

                <div className='avatar-container' onClick={handleUserClick}>
                    <Avatar className='user-avatar' icon={<AndroidOutlined/>} />
                </div>

                {showOptions && 
                    <div className='user-options'>
                        <p>Signed in as </p>
                        <p style={{fontWeight:'bold'}}>GarField</p>
                        <Divider />
                        <p>Profile</p>
                        <p>Settings</p>
                        <Divider />
                        <p>Sign out</p>
                    </div>}
            </Header>

            <Content className='content-container'>
                <div className='left'>
                    <p>Navigator</p>
                </div>
                <div className='divider-left'></div>
                <div className='center'>
                    <p>Article Content</p>
                </div>
                <div className='divider-right'></div>
                <div className='right'>
                    <p>Related Articles</p>
                </div>
            </Content>

        </div>
    )
}