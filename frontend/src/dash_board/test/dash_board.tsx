import React from 'react'
import { GithubOutlined, AndroidOutlined } from '@ant-design/icons';
import { Space, Input, Avatar} from 'antd';
import { Link } from 'react-router-dom';
import { Header, Content } from 'antd/es/layout/layout';

import './dash_board.css'
import slash from '../../attachment/img/slash.png'

export default function TestDashboard(){

    const suffix = (
        //加载图片
        <img src={slash} alt="slash" style={{width:20, height:20}}/>
    )

    function handleSearch(value: string) {
        console.log(value);
    }

    return (
        <div>
            <Header className='header'>
                <Space className='space-container' style={{width:'100%', height:'100%'}}>
                    <GithubOutlined className="logo" style={{color:'white', fontSize:24, height:'100%'}}/>
                    <div className='search-container'>
                        <Input style={{width:'100%'}} className="search-input" 
                            addonBefore={null} placeholder="请输入"  
                            suffix={suffix} allowClear />
                    </div>
                    
                    <div className='nav' >
                        <Link to='/hhh'>文档搜索</Link>
                        <Link to='/aaa'>文档分类</Link>
                    </div>
                </Space>
                <div className='avatar-container'>
                    <Avatar className='user-avatar' icon={<AndroidOutlined/>}/>
                </div>
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