import React, { useEffect } from 'react'
import { GithubOutlined, AndroidOutlined } from '@ant-design/icons';
import { Space, Input, Avatar, Divider} from 'antd';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';

import './dash_board.css'
import RecordList from '../record_list/record_list';
import AddFile from '../upload_file/upload_file';
import { DemoCirclePacking } from '../circle';
import FrameWork from './framework';


export default function TestDashboard(){
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

    const displayContent = (
        <div className='main-page-container'>
            <div className='left'>
                    <p>Navigator</p>
            </div>
            <div className='divider-left'></div>
            <div className='center'>
                <Switch>
                    <Route path={`/Dashboard/RecordList`}>
                        <RecordList />
                    </Route>
                    <Route path={`/Dashboard/Classification`}>
                        <DemoCirclePacking />
                    </Route>
                    <Route path={`/Dashboard/AddFile`}>
                        <AddFile />
                    </Route>
                </Switch>
            </div>
            <div className='divider-right'></div>
            <div className='right'>
                <p>Related Articles</p>
            </div>
        </div>
    )

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
        <FrameWork displayContent={displayContent}></FrameWork>
    )

}