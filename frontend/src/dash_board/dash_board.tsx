import React, {useState, useEffect} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LeftOutlined,
    BulbOutlined,
    MonitorOutlined,
    UserOutlined
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { FileAddOutlined, DotChartOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import './dash_board.css';
import AddFile from './upload_file/upload_file'
import {DemoCirclePacking} from './circle'
import RecordList from './record_list/record_list';
import UserPage from '../user_page/user_page';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Sider, Content } = Layout;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      onClick,
      children,
      label,
    } as MenuItem;
  }

export default function Dashboard ({displayContent} : any){
    const [goBack, setGoBack] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const windowHeight = window.innerHeight;
    const match = useRouteMatch();
    const history = useHistory();

    const items: MenuItem[] = [
        getItem('搜索文档', '1', <FileSearchOutlined />,() => changePageKey(1) ),
        getItem('文档分类', 'sub', <DotChartOutlined />, ()=>{}, [
            getItem('按疾病分类', 'sub-1', <MonitorOutlined />,  () => changePageKey(2.1)),
            getItem('按治法分类', 'sub-2', <BulbOutlined />, () => changePageKey(2.2)),
        ]),
        getItem('导入文档', '3', <FileAddOutlined />, () => changePageKey(3)),
    ];

    const userTrigger = (
        <div className='user-button' onClick={() => {history.push('/Dashboard/User');}}>
            <UserOutlined style={{fontSize: '20px', color: 'white'}} />
        </div>
    )

    // 监听地址变化，判断是否显示返回按钮
    useEffect(() => {
        if(window.location.pathname.indexOf('RecordDetail') != -1){
            setGoBack(true);
        }else{
            setGoBack(false);
        }
    }, [window.location.pathname])

    function changePageKey(key: number) {
        if(key === 1){
            history.push('/Dashboard/RecordList')
        }else if(key === 2.1){
            history.push('/Dashboard/DemoCirclePacking')
        }else if(key === 2.2){
            history.push('/Dashboard/DemoCirclePacking')
        }else if(key === 3){
            history.push('/Dashboard/AddFile')
        }
    }

    return(
        <Layout>
            <Sider trigger={userTrigger} collapsible collapsed={collapsed}>
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
                    items={items}
                    style={{marginTop: '30px'}}
                />
            </Sider>
    
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
                        <Route path={`${match.path}/User`} >
                            <UserPage />
                        </Route>
                        <Route path={`${match.path}`}>
                            <Redirect to="/Dashboard/RecordList" />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )

}