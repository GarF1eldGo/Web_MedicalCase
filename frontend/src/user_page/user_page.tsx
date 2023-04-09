import React from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import { 
    ReadOutlined,
    HistoryOutlined,
    HeartOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider } from 'antd';

import './user_page.css';
import FrameWork from '../dash_board/test/framework';
import userAvatar from '../attachment/img/avatar.jpg';

export default function UserPage(){

    const userContent = (
        <div className="user-page-container">
            <Header className='user-navi-header'>
                <Button icon={<ReadOutlined />}>Overview</Button>
                <Button icon={<HeartOutlined />}>Favoriate</Button>
                <Button icon={<HistoryOutlined />}>History</Button>
            </Header>
            <Divider className='user-navi-divider'/>
            <Content className='content-container'>
                <div className='left-container'>
                    <Avatar className='user-avatar' src={userAvatar} />
                    <h1 className='username'>马保国中医</h1>
                    <div className='edit-container'>
                        <Button>Edit profile</Button>
                    </div>
                </div>
                <div className='right-container'>

                </div>
            </Content>
        </div>

    )

    return (
        <div>
            <FrameWork displayContent={userContent}/>
        </div>
    )
}