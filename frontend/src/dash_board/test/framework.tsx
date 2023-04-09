import React, { useEffect, useRef } from 'react'
import { GithubOutlined, AndroidOutlined } from '@ant-design/icons';
import { Space, Input, Avatar, Divider, AutoComplete} from 'antd';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';
import { InputRef } from 'antd/lib/input/Input';

import './framework.css'
import slash from '../../attachment/img/slash.png'
import userAvatar from '../../attachment/img/avatar.jpg'


export default function FrameWork(props:any){
    const [showOptions, setShowOptions] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [showIcon, setShowIcon] = React.useState(true);
    const [preWidth, setPreWidth] = React.useState(0);
    const match = useRouteMatch();
    const history = useHistory();

    const options = [
        { value: 'Document Search' },
        { value: 'Classification' },
        { value: 'Import Documents' },
      ];

    useEffect(() => {
        // 初始化输入框宽度
        setPreWidth(document.getElementsByClassName('search-input')[0].clientWidth);
        console.log('preWidth: ', preWidth);
        console.log('match path : ', match.path);
    }, []);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        // setInputValue(event.target.value);
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


    document.addEventListener('keydown', (event) => {
        console.log('event: ', event);
        if(event.key === '/'){
            // 将光标移动到输入框中
            const input = document.getElementsByClassName('search-input')[0] as HTMLInputElement;
            input.focus();
        }
    })

    return (
        <div>
            <Header className='header'>
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
                        <a onClick={() => {history.push('/Dashboard/RecordList')}}>Document Search</a>
                        <a onClick={() => {history.push('/Dashboard/Classification')}}>Classification</a>
                        <a onClick={() => {history.push('/Dashboard/AddFile')}}>Import Documents</a>
                    </div>
                </Space>

                <div className='avatar-container' onClick={handleUserClick}>
                    <Avatar className='user-avatar' src={userAvatar}/>
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