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
import RecordList from './record_list/record_list';
import RecordRead from './record_list/record_read';



const { Header, Sider, Content } = Layout;


export default function Dashboard(){
    const [collapsed, setCollapsed] = useState(false);
    const [page_key, setPageKey] = useState(1);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const windowHeight = window.innerHeight;

    const changeSelectedKey = () => {
        setPageKey(4);
    }

    
    // 条件渲染
    function SelectContent(props: any){
        if(props.selectKey === 1){
            return <RecordList chanegSelectedKey={changeSelectedKey}/>
        }else if(props.selectKey === 2){
            return <DemoCirclePacking />
        }else if(props.selectKey === 3){
            return <AddFile />
        }else if(props.selectKey === 4){
            return <RecordRead />
        }else{
            return <div>404</div>
        }
    }

    return (
        <div className='Dashboard'>

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
                            onClick: () => setPageKey(1),
                            label: '搜索文档',
                        },
                        {
                            key: '2',
                            icon: <DotChartOutlined />,
                            onClick: () => setPageKey(2),
                            label: '文档分类',
                        },
                        {
                            key: '3',
                            icon: <FileAddOutlined />,
                            onClick: () => setPageKey(3),
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
                    <SelectContent selectKey={page_key}/>
                </Content>
            </Layout>
        </Layout>

        </div>
    )
}