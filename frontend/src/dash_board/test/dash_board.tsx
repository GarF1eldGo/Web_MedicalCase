import React from 'react'
import { GithubOutlined } from '@ant-design/icons';
import { Space, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

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
            <Header className='header' style={{color:"#002766", height:60}}>
                <Space className='space-container' style={{width:'100%', height:'100%'}}>
                    <GithubOutlined style={{color:'white', fontSize:24}}/>
                    <Input style={{width:'100%'}} className="search-input" 
                        addonBefore={null} placeholder="请输入"  
                        suffix={suffix} allowClear />
                    <div className='nav' >
                        <Link to='/hhh'>文档搜索</Link>
                        <Link to='/aaa'>文档分类</Link>
                    </div>
                </Space>
            </Header>
        </div>
    )
}