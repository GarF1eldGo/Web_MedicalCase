import React, { useEffect, useState, useRef } from 'react'
import { List, Timeline } from 'antd';
import { Link, Switch, Route, useLocation, useHistory } from 'react-router-dom';
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
    children: ViewHistory[];
};

interface TimelineItemProps{
    id: string;
    title: string;
    description: string;
}

export default function TestDashboard(){
    const [viewHistory, setViewHistory] = useState<ViewHistory[]>([]);
    const [responsiveNum, setResponsiveNum] = useState<number>(4);
    const [pathChange, setPathChange] = useState<boolean>(false);
    const [relatedSource, setRelatedSource] = useState<TimelineItemProps[]>([]);
    const [hideState, setHideState] = useState<string>('block');
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const relatedRef = useRef<HTMLDivElement>(null);
    const history = useHistory();
    
    useEffect(() => {
        // relatedSource.push({
        //     id: '1',
        //     title: 'title1',
        //     description: '诉前段时间经医院检查患有乙肝，其表面'
        // });
        // relatedSource.push({
        //     id: '2',
        //     title: 'title2',
        //     description: '生石膏20g,熟石膏15g,知母10g,黄连3g,桅子炭10g, 土茯苓30g, 连翘15g,天花粉15g,蹩香6'
        // });
        // relatedSource.push({
        //     id: '3',
        //     title: 'title3',
        //     description: '生石膏30g,知母10g,黄苓10g,黄连4g, 土茯苓30g,桅子 炭10g'
        // });

        const recordID = location.pathname.split('=')[1];
        if(location.pathname === `/Dashboard/RecordList/RecordDetail/id=${recordID}`){
            setLoading(true);
            setRelatedSource([]);
            let url = 'http://127.0.0.1:8080/api/user/recommendation/' + recordID;
            axios.get(url)
            .then((res) => {
                let data = res.data;
                let tmpList: TimelineItemProps[] = [];
                for(let i = 0; i < data.length; i++){
                    tmpList.push({
                        id: data[i].id,
                        title: data[i].title,
                        description: data[i].content.substring(0, 20)
                    });
                }
                setRelatedSource(tmpList);
                setLoading(false);
            }
            )
            .catch((err) => {
                console.log(err);
            });
        }
    }, [location.pathname]);

    useEffect(() => {
        // 如果路径为'Classification'或者'AddFile', 不显示右侧的timeline
        console.log('pathname:', location.pathname);
        if (location.pathname === '/Dashboard/Classification' || location.pathname === '/Dashboard/AddFile') {
            if (relatedRef.current) {
                relatedRef.current.style.display = 'none';
                setHideState('none');
            }
        } else {
            if (relatedRef.current && window.innerWidth > 700) {
                relatedRef.current.style.display = 'block';
                setHideState('block');
            }else if(relatedRef.current && window.innerWidth <= 700){
                relatedRef.current.style.display = 'none';
                setHideState('none');
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        if(window.innerWidth <= 700){
            if(relatedRef.current){
                relatedRef.current.style.display = 'none';
            }
        }else if(window.innerWidth > 700){
            if(relatedRef.current){
                relatedRef.current.style.display = 'block';
            }
        }
    }, [window.innerWidth]);

    // 路径发生变化时，重新获取数据
    useEffect(() => {
        let url = 'http://127.0.0.1:8080/api/user/viewHistory/';
        url += localStorage.getItem('userID');
        console.log('get history : ', url);

        setViewHistory([]);
        axios.get(url)
        .then((res) => {
            // 解析history数据
            let history = res.data;
            let preDay = '';
            let tmpList = [];
            //清空viewHistory
            for(let i = 0; i < history.length; i++){
                let day = history[i].time.split(' ')[0];
                let hour = history[i].time.split(' ')[1];
                if (day !== preDay) {
                    tmpList.push({
                        id: '',
                        title: day,
                        description: '',
                        time: '',
                        day: day,
                        hour: '',
                        children: [{
                            id: history[i].id,
                            title: history[i].title,
                            description: history[i].description,
                            time: history[i].time,
                            day: '',
                            hour: hour,
                            children: []
                        }]
                    });
                    preDay = day;
                } else {
                    tmpList[tmpList.length - 1].children.push({
                        id: history[i].id,
                        title: history[i].title,
                        description: history[i].description,
                        time: history[i].time,
                        day: '',
                        hour: hour,
                        children: []
                    });
                }
            }
            setViewHistory(tmpList);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pathChange]);

    // 根据屏幕大小调整history列表显示数量
    useEffect(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        if(height < 800){
            setResponsiveNum(4);
        }else if(height < 1000){
            setResponsiveNum(5);
        }else{
            setResponsiveNum(6);
        }
    }, []);

    // 监听路径变化
    useEffect(() => {
      setPathChange(!pathChange);
    }, [location]);

    // 监听滚动条事件
    useEffect(() => {
        const handleResize = () => {
            const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
            const pageHeight = document.documentElement.scrollHeight - headerHeight;
            console.log('in handleResize', pageHeight);
            if(leftRef.current){
                leftRef.current.style.height = `${pageHeight}px`;
            }
            if(rightRef.current){
                rightRef.current.style.height = `${pageHeight}px`;
            }
          };
      
          window.addEventListener('scroll', handleResize);
      
          return () => {
            if(leftRef.current){
                leftRef.current.style.height = '100%';
            }
            if(rightRef.current){
                rightRef.current.style.height = '100%';
            }
            window.removeEventListener('scroll', handleResize);
          };
    }, []);

    const displayContent = (
        <div className='main-page-container'>
            <div className='left'>
                <p>浏览历史</p>
                <div className='history-list-container'>
                    <List className='history-list' itemLayout="horizontal" dataSource={viewHistory.slice(0, 2)}
                        renderItem={(item:any) => (
                            <List.Item className='history-root-item' style={{ textAlign: 'center' }}>
                                <h3 className='day-title-history'>{item.title}</h3>
                                <List className='history-children-list' itemLayout="horizontal" 
                                    dataSource={item.children.slice(0, responsiveNum)}
                                    renderItem={(item:any) => {
                                        return (
                                            <div className='history-list-item'>
                                                <span className='time'>{item.hour}</span>
                                                <div className='right-history'>
                                                    <Link className='title' 
                                                        to={`/Dashboard/RecordList/RecordDetail/id=${item.id}`}>
                                                            {item.title}
                                                    </Link>
                                                    <p className='description'>{item.description}</p>
                                                </div> 
                                            </div>
                                        )
                                    }} />
                            </List.Item>
                        )}
                        bordered={false}
                    />
                </div>
            </div>
            <div className='divider-left' ref={leftRef} ></div>
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
                    <Route path={`/Dashboard`}>
                        <RecordList />
                    </Route>
                </Switch>
            </div>
            <div className='divider-right' ref={rightRef}></div>
            <div className='right' ref={relatedRef} style={{display:hideState}}>
                <p className='right-title'>相关医案推荐</p>
                {loading && <div className="spinner" />}
                {relatedSource && <Timeline className='timeline-related' >
                        {relatedSource.map((item) => {
                            return (
                                <Timeline.Item key={item.id} className='timeline-item'>
                                    <Link to={`/Dashboard/RecordList/RecordDetail/id=${item.id}`}>{item.title}</Link>
                                    <p>{item.description}</p>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                }
            </div>
        </div>
    )

    return (
        <FrameWork displayContent={displayContent}></FrameWork>
    )

}