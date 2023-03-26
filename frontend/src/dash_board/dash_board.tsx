import React,{ useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import { FileAddOutlined, DotChartOutlined } from '@ant-design/icons';
import './dash_board.css';
import add_file from './upload_file/upload_file'
import Link from 'antd/es/typography/Link';


const { Header, Sider, Content } = Layout;
const page_key = 1;


function file_classification(){
    console.log("file classification");
}

export default function Dashboard(){
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const windowHeight = window.innerHeight;
  
    return (
        <div className='Dashboard'>

        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1" icon={<FileAddOutlined />} onClick={add_file}>
                        <Link href="/upload">添加文档</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DotChartOutlined />} onClick={file_classification}>
                        <Link href="/classification">文档分类</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: windowHeight,
                        background: colorBgContainer,
                    }}
                    className="main_page"
                >
                    {add_file()}
                </Content>
            </Layout>
        </Layout>

        </div>
    )
}