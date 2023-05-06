import React, { useEffect } from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import { 
    ReadOutlined,
    HistoryOutlined,
    HeartOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Slider } from 'antd';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import './user_page.css';
import FrameWork from '../dash_board/test/framework';
import userAvatar from '../attachment/img/avatar.jpg';
import ReactTooltip from 'react-tooltip';
import tinycolor from 'tinycolor2';
import axios from 'axios';
import UserHistory from './user_history';
import UserFavorite from './user_favorite';

interface historyCount{
    date: Date;
    count: number;
};

export default function UserPage(){
    const history = useHistory();
    const now = new Date();
    const [fontSize, setFontSize] = React.useState(() => {
        const storedFontSize = localStorage.getItem('record-setting-font-size');
        return storedFontSize ? parseInt(storedFontSize, 10) : 16;
    });
    const [backgroundColor, setBackgroundColor] = React.useState(localStorage.getItem('record-setting-background-color') || '#fff');
    const [fontColor, setFontColor] = React.useState(localStorage.getItem('record-setting-font-color') || '#000');
    const [curColor, setCurColor] = React.useState( parseInt(localStorage.getItem('record-setting-light') || '100', 10));
    const [data, setData] = React.useState<historyCount[]>([]);
    const [totalCount, setTotalCount] = React.useState(0);

    // 监听storage事件
    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        // 获取历史记录信息
        const url = 'http://127.0.0.1:8080/api/user/historyCount/' + localStorage.getItem('userID');
        axios.get(url)
        .then((res) => {
            const data = res.data;
            const historyCount: historyCount[] = [];
            let tmpCount = 0;
            for(let i = 0; i < data.length; i++){
                historyCount.push({
                    date: new Date(data[i].date),
                    count: data[i].count,
                });
                tmpCount += data[i].count;
            }
            setData(historyCount);
            setTotalCount(tmpCount);
        })
        .catch((err) => {
            console.log(err);
        });
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    function handleStorageChange(event: StorageEvent) {
        if (event.key === 'record-setting-background-color'){
            setBackgroundColor(event.newValue || '#fff');
        }else if (event.key === 'record-setting-font-color'){
            setFontColor(event.newValue || '#000');
        }else if (event.key === 'record-setting-light'){
            setCurColor(parseInt(event.newValue || '100', 10));
        }   
    }

    function colorScale(value: any) {
        if(!value){
            return 'color-empty';
        }
        let count = 1;
        if(value.count < 3){
            count = 1;
        }else if(value.count < 5){
            count = 2;
        }else if(value.count < 7){
            count = 3;
        }else{
            count = 4;
        }
        return `color-scale-${count}`;
    }

    function heatmapHover(value: any){
        const opacity = value ? value.count / 4 : 0;
        if(!value || !value.date){
            return null;
        }
        return {
            'data-tip': `${value.date.toDateString()}: ${value.count} articles`,
            style: {
                opacity: opacity,
                backgroundColor: `rgba(0, 151, 230, ${opacity})`,
              },
        }
    }

    function handleFontAfterChange(value: any){
        localStorage.setItem('record-setting-font-size', value);
        setFontSize(value);
        alert('修改文本字体大小为：' + value + 'px');
    }

    function handleLightAfterChange(value: any){
        const color = tinycolor.mix('#FFFFFF', '#000000', 100-value).toHexString();
        const fontColor = tinycolor(color).isDark() ? '#fff' : '#000';

        setBackgroundColor(color);
        setFontColor(fontColor);
        setCurColor(value);
        const storageEvent = new StorageEvent('storage', {
            key: 'record-setting-background-color',
            newValue: color,
        });
        const storageEvent2 = new StorageEvent('storage', {
            key: 'record-setting-font-color',
            newValue: fontColor,
        });
        const storageEvent3 = new StorageEvent('storage', {
            key: 'record-setting-light',
            newValue: value.toString(),
        });

        localStorage.setItem('record-setting-background-color', color);
        window.dispatchEvent(storageEvent);
        localStorage.setItem('record-setting-font-color', fontColor);
        window.dispatchEvent(storageEvent2);
        localStorage.setItem('record-setting-light', value.toString());
        window.dispatchEvent(storageEvent3);
    }

    function Overview(){
        return (
            <div className='overview-container' >
                <h3 className='overview-hint'>过去一年共阅读 {totalCount} 篇医案！</h3>
                <CalendarHeatmap
                    startDate={new Date(now.getFullYear(), now.getMonth() - 11, 1)}
                    endDate={new Date(now.getFullYear(), now.getMonth() + 1, 0)}
                    values={data}
                    showWeekdayLabels={true}
                    tooltipDataAttrs={(value:any) => heatmapHover(value)}
                    classForValue={(value) => colorScale(value)}
                    onClick={(value) => console.log('click value: ', value)}
                />
                <div className='setting-title'>
                    <h1 className='setting-title-text'>设置</h1>
                    <Divider className='setting-divider'/>
                </div>
                <div className='record-setting-container'>
                    <div className='record-setting-item'>
                        <h3 className='record-setting-title'>修改医案字体大小</h3>
                        <Slider className='record-setting-slider' 
                            defaultValue={fontSize} min={10} max={20} step={1}
                            onAfterChange={handleFontAfterChange}
                            style={{color:fontColor}}
                            railStyle={{backgroundColor: '#8cc665'}}
                            trackStyle={{backgroundColor: '#8cc665'}}
                            marks={{
                                10: '10',
                                15: '15',
                                20: '20',
                            }}
                        />
                    </div>
                    <div className='record-setting-item'>
                        <h3 className='record-setting-title'>修改屏幕亮度</h3>
                        <Slider className='record-setting-slider' 
                            defaultValue={curColor} min={10} max={100} step={10}
                            onAfterChange={handleLightAfterChange}
                            style={{color:fontColor}}
                            railStyle={{backgroundColor: '#8cc665'}}
                            trackStyle={{backgroundColor: '#8cc665'}}
                            marks={{
                                10: '10',
                                50: '50',
                                100: '100',
                            }}
                        />
                    </div>
                </div>
                <ReactTooltip />
            </div>
        )
    }

    const userContent = (
        <div className="user-page-container" style={{backgroundColor:backgroundColor , color:fontColor}}>
            <Header className='user-navi-header' style={{backgroundColor:backgroundColor, color:fontColor}}>
                <Button onClick={() => {history.push('/UserPage/Overview')}} icon={<ReadOutlined />}>总览</Button>
                <Button onClick={() => {history.push('/UserPage/Favorite')}} icon={<HeartOutlined />}>收藏</Button>
                <Button onClick={() => {history.push('/UserPage/History')}} icon={<HistoryOutlined />}>浏览历史</Button>
            </Header>
            <Divider className='user-navi-divider'/>
            <Content className='content-container'>
                <div className='left-container'>
                    <Avatar className='user-avatar' src={userAvatar} />
                    <h1 className='username'>马保国</h1>
                    <div className='edit-container'>
                        <Button>Edit profile</Button>
                    </div>
                </div>
                <div className='right-container'>
                    <Switch>
                        <Route path={`/UserPage/Overview`}>
                            <Overview />
                        </Route>
                        <Route path={`/UserPage/History`}>
                            <UserHistory />
                        </Route>
                        <Route path={`/UserPage/Favorite`}>
                            <UserFavorite />
                        </Route> 
                        <Route path={`/UserPage`}>
                            <Overview />
                        </Route>
                    </Switch>
                </div>
            </Content>
        </div>

    )

    return (
        <div style={{backgroundColor:backgroundColor, color:fontColor}}>
            <FrameWork displayContent={userContent}/>
        </div>
    )
}