import React, {useState, useEffect} from 'react';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    BulbOutlined,
    MonitorOutlined,
    FileAddOutlined, 
    DotChartOutlined, 
    FileSearchOutlined
} from '@ant-design/icons';

import './side_nav.css';

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

export default function SideNav(props:any){
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const history = useHistory();

    const items: MenuItem[] = [
        getItem('搜索医案', '1', <FileSearchOutlined />,() => changePageKey(1) ),
        getItem('医案分类', '2', <DotChartOutlined />, ()=> changePageKey(2)),
        getItem('导入医案', '3', <FileAddOutlined />, () => changePageKey(3)),
    ];

    function changePageKey(key: number) {
        if(key === 1){
            history.push('/Dashboard/RecordList')
        }else if(key === 2){
            history.push('/Dashboard/Classification')
        }else if(key === 3){
            history.push('/Dashboard/AddFile')
        }
    }

    return (
        props.display && 
        <Sider className={props.className} trigger={null} collapsed={false}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{marginTop: '70px'}}
            />
        </Sider>
    )
 
}