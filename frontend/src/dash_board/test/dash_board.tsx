import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

import './dash_board.css'
import RecordList from '../record_list/record_list';
import AddFile from '../upload_file/upload_file';
import ClassificationDisease from '../classification/classification';
import FrameWork from './framework';

interface ViewHistory{
    id: string;
    title: string;
    description: string;
    time: string;
    day: string;
    hour: string;
};

export default function TestDashboard(){
    const [viewHistory, setViewHistory] = useState<ViewHistory[]>([]);
    
    useEffect(() => {
        let url = 'http://127.0.0.1:8080/api/user/viewHistory/';
        url += localStorage.getItem('userID');
        
        axios.get(url)
        .then((res) => {
            // 解析history数据
            let history = res.data;
            console.log(history);
            for(let i = 0; i < history.length; i++){
                let day = history[i].time.split(' ')[0];
                let hour = history[i].time.split(' ')[1];
                viewHistory.push({
                    id: history[i].id,
                    title: history[i].title,
                    description: history[i].description,
                    time: history[i].time,
                    day: day,
                    hour: hour,
                });
            }
            console.log('in view history:', viewHistory.length);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    // 根据屏幕大小调整history列表显示数量
    const [responsiveNum, setResponsiveNum] = useState<number>(5);
    useEffect(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        if(height < 800){
            setResponsiveNum(4);
        }else if(height < 1000){
            setResponsiveNum(10);
        }else if(height < 1200){
            setResponsiveNum(12);
        }else{
            setResponsiveNum(14);
        }
    }, []);

    const displayContent = (
        <div className='main-page-container'>
            <div className='left'>
                <p>Read History</p>
                <div className='history-list-container'>
                    <List className='history-list' itemLayout="horizontal" dataSource={viewHistory.slice(0, responsiveNum)}
                        renderItem={(item:any) => (
                            <List.Item style={{ textAlign: 'center' }}>
                                <div className='history-list-item'>
                                    <span className='time'>{item.hour}</span>
                                    <div className='right'>
                                        <Link className='title' to={`/Dashboard/RecordList/RecordDetail/id=${item.id}`}>{item.title}</Link>
                                        <p className='description'>{item.description}</p>
                                    </div>
                                    
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <div className='divider-left'></div>
            <div className='center'>
                <Switch>
                    <Route path={`/Dashboard/RecordList`}>
                        <RecordList />
                    </Route>
                    <Route path={`/Dashboard/Classification`}>
                        <ClassificationDisease />
                    </Route>
                    <Route path={`/Dashboard/AddFile`}>
                        <AddFile />
                    </Route>
                </Switch>
            </div>
            <div className='divider-right'></div>
            <div className='right'>
                <p>Related Articles</p>
            </div>
        </div>
    )

    return (
        <FrameWork displayContent={displayContent}></FrameWork>
    )

}