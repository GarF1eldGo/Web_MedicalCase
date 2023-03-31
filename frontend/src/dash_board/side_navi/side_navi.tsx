import React, {useState, useEffect} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { FileAddOutlined, DotChartOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function sideNav ({displayContent, changePageKey} : any){
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const windowHeight = window.innerHeight;

    return(
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[        
                        {
                            key: '1',
                            icon: <FileSearchOutlined />,
                            onClick: () => changePageKey(1),
                            label: '搜索文档',
                        },
                        {
                            key: '2',
                            icon: <DotChartOutlined />,
                            onClick: () => changePageKey(2),
                            label: '文档分类',
                        },
                        {
                            key: '3',
                            icon: <FileAddOutlined />,
                            onClick: () => changePageKey(3),
                            label: '导入文档',
                        },
                    ]}
                />
        
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
                    {displayContent}
                </Content>
            </Layout>
    </Layout>
    )

}