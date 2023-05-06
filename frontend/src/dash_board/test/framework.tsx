import React, { useEffect, useRef } from 'react'
import { GithubOutlined, AndroidOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Space, Input, Avatar, Divider, AutoComplete} from 'antd';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';
import { InputRef } from 'antd/lib/input/Input';

import './framework.css'
import slash from '../../attachment/img/slash.png'
import userAvatar from '../../attachment/img/avatar.jpg'
import SideNav from '../side_nav/side_nav';
import { local } from 'd3';


export default function FrameWork(props:any){
    const [showOptions, setShowOptions] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [showIcon, setShowIcon] = React.useState(true);
    const [preWidth, setPreWidth] = React.useState(0);
    const [displaySideNav, setDisplaySideNav] = React.useState(false);
    const [backgroundColor, setBackgroundColor] = React.useState(localStorage.getItem('record-setting-background-color') || '#fff');
    const [fontColor, setFontColor] = React.useState(localStorage.getItem('record-setting-font-color') || '#000');
    const [showImport, setShowImport] = React.useState(false);

    const match = useRouteMatch();
    const history = useHistory();
    const divRef = useRef<HTMLDivElement>(null);

    const options = [
        { value: '搜索医案' },
        { value: '医案分类' },
        { value: '导入医案' },
      ];

    useEffect(() => {
        // 初始化输入框宽度
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        
        const isAdmin = localStorage.getItem('isAdmin');
        if(isAdmin === 'true'){
            setShowImport(true);
        }else{
            setShowImport(false);
        }
    }, []);

    // 监听滚动条事件&&storage变化
    useEffect(() => {
        const handleResize = () => {
            const pageHeight = document.documentElement.scrollHeight;
            if(divRef.current){
                divRef.current.style.height = `${pageHeight}px`;
            }
          };
      
          window.addEventListener('scroll', handleResize);
          window.addEventListener('storage', handleStorageChange);
      
          return () => {
            if(divRef.current){
                divRef.current.style.height = '100%';
            }
            window.removeEventListener('scroll', handleResize);
            window.removeEventListener('storage', handleStorageChange);
          };
    }, []);


    function handleStorageChange(event: StorageEvent) {
        console.log('event', event);
        if (event.key === 'record-setting-background-color'){
            setBackgroundColor(event.newValue || '#fff');
        }else if (event.key === 'record-setting-font-color'){
            setFontColor(event.newValue || '#000');
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        // setInputValue(event.target.value);
    }

    function handlePressUser(event: React.KeyboardEvent<HTMLInputElement>){
        console.log('user input : ', inputValue);
    }

    // 显示用户选项
    function handleUserClick(){
        setShowOptions(!showOptions);
    }

    // 更改输入框宽度
    function handleOnFocus(){
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        const newWidth = preWidth + 80;
        document.getElementsByClassName('search-input')[0].setAttribute('style', 'width: ' + newWidth + 'px');
    }

    // 用户放弃输入
    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>){
        if(event.target.value === ''){
            setShowIcon(true);
            document.getElementsByClassName('search-input')[0].setAttribute('style', 'width: ' + preWidth + 'px');
        }
    }

    // 搜索框文本提示处理
    function handleOnSelect(value: string, option: any){
        console.log('onSelect', value, option);
        if(value === 'Document Search'){
            history.push('/Dashboard/RecordList');
        }else if(value === 'Classification'){
            history.push('/Dashboard/Classification');
        }else if(value === 'Import Documents'){
            history.push('/Dashboard/AddFile');
        }
    }

    function signOutHandle(){
        // 删除localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('userID');
        localStorage.removeItem('isAdmin');
        // 进入home page
        history.push('/');
    }

    document.addEventListener('keydown', (event) => {
        if(event.key === '/'){
            // 将光标移动到输入框中
            const input = document.getElementsByClassName('search-input')[0] as HTMLInputElement;
            input.focus();
        }
    })

    return (
        <div className='framework-container' ref={divRef}>
            <SideNav className='side-nav' display={displaySideNav} />
            <Header className='header'>
                {React.createElement(displaySideNav ? MenuFoldOutlined : MenuUnfoldOutlined , {
                        className: 'side-trigger',
                        onClick: () => {
                            setDisplaySideNav(!displaySideNav);
                        }
                })}
                <Space className='space-container' style={{width:'100%', height:'100%'}}>
                    <GithubOutlined className="logo" style={{color:'white', fontSize:24, height:'100%'}}/>
                    <div className='search-container'>   
                        <AutoComplete className='auto-complete-container'
                             style={{ width: '100%' }}
                             options={options}
                             placeholder="Search or jump to..."
                             onSelect={handleOnSelect}
                             filterOption={(inputValue, option) =>
                               option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Input  className="search-input"
                                addonBefore={null} placeholder="Please input"
                                value={inputValue} onChange={handleInputChange}  
                                onPressEnter={handlePressUser}
                                onClick={() => setShowIcon(false)}
                                onBlur={handleOnBlur}
                                onFocus={handleOnFocus}
                            />
                        </AutoComplete>
                        <div className='suffix-container'>
                            {showIcon && <img className='suffix-img' src={slash} alt="slash" />}
                        </div>
                    </div>
                    
                    <div className='nav' >
                        <a onClick={() => {history.push('/Dashboard/RecordList')}}>搜索医案</a>
                        <a onClick={() => {history.push('/Dashboard/Classification')}}>医案分类</a>
                        {showImport && <a onClick={() => {history.push('/Dashboard/AddFile')}}>导入医案</a>}
                    </div>
                </Space>

                <div className='avatar-container' onClick={handleUserClick}>
                    <Avatar className='user-avatar' src={userAvatar}/>
                </div>

                {showOptions && 
                    <div className='user-options'>
                        <p onClick={() => {history.push('/UserPage')}}>已登录 </p>
                        <p onClick={() => {history.push('/UserPage')}} style={{fontWeight:'bold'}}>GarField</p>
                        <Divider />
                        <p>Profile</p>
                        <p>Settings</p>
                        <Divider />
                        <p onClick={signOutHandle}>登出</p>
                    </div>}
            </Header>

            <Content className='content-container' style={{backgroundColor:backgroundColor, color:fontColor}}>
                {props.displayContent}
            </Content>

        </div>
    )
}