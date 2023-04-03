import React,{ useState, useEffect } from 'react';
import { Layout } from 'antd';
import {useHistory} from 'react-router-dom';
import Link from 'antd/es/typography/Link';

import './dash_board.css';
import AddFile from './upload_file/upload_file'
import {DemoCirclePacking} from './circle.js'
import RecordList from './record_list/record_list';
import SideNav from './side_navi/side_navi';


const { Header, Sider, Content } = Layout;


export default function Dashboard(){
    const [page_key, setPageKey] = useState(1);
    const homeURL = 'http://127.0.0.1:3000/Dashboard';
    const history = useHistory();

    // 条件渲染
    function SelectContent(props: any){
        if(props.selectKey === 1){
            return <RecordList setPageKey={setPageKey}/>
        }else if(props.selectKey === 2){
            const newURL = homeURL + '/classification';
            window.history.pushState({}, '', newURL);
            return <DemoCirclePacking />
        }else if(props.selectKey === 3){
            const newURL = homeURL + '/add_file';
            window.history.pushState({}, '', newURL);
            return <AddFile />
        }else{
            return <div>404</div>
        }
    }

    return (
        <div className='Dashboard'>
            <SideNav displayContent={<SelectContent selectKey={page_key}/>} changePageKey={setPageKey} currentPath={location.pathname}/>
        </div>
    )
}