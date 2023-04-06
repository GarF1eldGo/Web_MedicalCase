import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { 
    ReadOutlined,
    HistoryOutlined,
    HeartOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';

import './user_page.css';
import FrameWork from '../dash_board/test/framework';

export default function UserPage(){

    const userNaviHeader = (
        <Header className='user-navi-header'>
            {/* 历史记录、收藏、总览 */}
            <Button icon={<ReadOutlined />}>Overview</Button>
            <Button icon={<HeartOutlined />}>Favoriate</Button>
            <Button icon={<HistoryOutlined />}>History</Button>
        </Header>
    )

    const userContent = (
        <div className='user-page-container'>
            {userNaviHeader}
            <Divider className='user-navi-divider'/>
        </div>
    )

    return (
        <div>
            <FrameWork displayContent={userContent}/>
        </div>
    )
}