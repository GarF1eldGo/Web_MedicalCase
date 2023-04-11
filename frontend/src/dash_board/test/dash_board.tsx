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

    return (
        <FrameWork displayContent={displayContent}></FrameWork>
    )

}