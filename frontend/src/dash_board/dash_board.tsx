import React,{ useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { FileAddOutlined, DotChartOutlined, FileSearchOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

import './dash_board.css';
import AddFile from './upload_file/upload_file'
import Classification from './classification/classification'
import {DemoCirclePacking} from './circle.js'



const { Header, Sider, Content } = Layout;

// 条件渲染
function SelectContent(props: any){
    if(props.selectKey === 1){
        return <AddFile />
    }else if(props.selectKey === 2){
        return <DemoCirclePacking />
    }else{
        return <AddFile />
    }
}

export default function Dashboard(){
    const [collapsed, setCollapsed] = useState(false);
    const [page_key, setPageKey] = useState(1);
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
                    <Menu.Item key="1" icon={<FileSearchOutlined />} onClick={
                        () => setPageKey(1)
                    }>
                        <p>搜索文档</p>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DotChartOutlined />} onClick={
                        () => setPageKey(2)
                    }>
                        <p>文档分类</p>
                        {/* <Link href="/classification">文档分类</Link> */}
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileAddOutlined />} onClick={
                        () => setPageKey(3)
                    }>
                        <p>导入文档</p>
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
                    <SelectContent selectKey={page_key}/>;
                </Content>
            </Layout>
        </Layout>

        </div>
    )
}