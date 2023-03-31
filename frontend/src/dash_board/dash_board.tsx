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
import SideNav from './side_navi/side_navi';


const { Header, Sider, Content } = Layout;


export default function Dashboard(){
    const [collapsed, setCollapsed] = useState(false);
    const [page_key, setPageKey] = useState(1);

    const changeSelectedKey = () => {
        setPageKey(4);
    }

    
    // 条件渲染
    function SelectContent(props: any){
        if(props.selectKey === 1){
            return <RecordList setPageKey={setPageKey}/>
        }else if(props.selectKey === 2){
            return <DemoCirclePacking />
        }else if(props.selectKey === 3){
            return <AddFile />
        }else{
            return <div>404</div>
        }
    }

    return (
        <div className='Dashboard'>
            <SideNav displayContent={<SelectContent selectKey={page_key}/>} changePageKey={setPageKey}/>
        </div>
    )
}