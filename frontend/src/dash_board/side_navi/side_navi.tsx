import React, {useState, useEffect} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LeftOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { FileAddOutlined, DotChartOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import AddFile from '../upload_file/upload_file'
import {DemoCirclePacking} from '../circle'
import RecordList from '../record_list/record_list';


const { Header, Sider, Content } = Layout;

export default function SideNav ({displayContent} : any){
    const [goBack, setGoBack] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const windowHeight = window.innerHeight;
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        // 获取当前时间
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const now_time = hour + ':' + minute + ':' + second;
        console.log(now_time + ' ' + window.location.pathname);
        if(window.location.pathname.indexOf('RecordDetail') != -1){
            setGoBack(true);
        }else{
            setGoBack(false);
        }
    }, [window.location.pathname])

    function changePageKey(key: number) {
        if(key === 1){
            history.push('/Dashboard/RecordList')
        }else if(key === 2){
            history.push('/Dashboard/DemoCirclePacking')
        }else if(key === 3){
            history.push('/Dashboard/AddFile')
        }
    }

    return(
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="sider-icon">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                            style: { color: 'white' },
                    })}
                </div>
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
                    style={{marginTop: '30px'}}
                />
            </Sider>
    
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {/* 此处添加返回按钮 */}
                    {goBack && 
                        <LeftOutlined onClick={() => window.history.back()} style={{color: 'black', fontSize: '20px', marginLeft: '20px'}}/>}
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
                <Switch>
                    <Route path={`${match.path}/RecordList`}>
                        <RecordList />
                    </Route>
                    <Route path={`${match.path}/DemoCirclePacking`}>
                        <DemoCirclePacking />
                    </Route>
                    <Route path={`${match.path}/AddFile`}>
                        <AddFile />
                    </Route>
                </Switch>
                </Content>
            </Layout>
        </Layout>
    )

}