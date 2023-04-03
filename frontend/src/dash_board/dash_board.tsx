import React,{ useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

import './dash_board.css';
import AddFile from './upload_file/upload_file'
import {DemoCirclePacking} from './circle.js'
import RecordList from './record_list/record_list';
import SideNav from './side_navi/side_navi';


const { Header, Sider, Content } = Layout;

export default function Dashboard(){
    return (
        <SideNav />
    )
}