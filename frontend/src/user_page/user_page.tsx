import React from 'react';
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

export default function UserPage(){
    const history = useHistory();
    const now = new Date();
    const [backgroundColor, setBackgroundColor] = React.useState(localStorage.getItem('record-setting-background-color') || '#fff');
    const [fontColor, setFontColor] = React.useState(localStorage.getItem('record-setting-font-color') || '#000');
    const [curColor, setCurColor] = React.useState(100);

    const data = [
      { date: new Date(now.getFullYear(), now.getMonth(), 1), count: 5 },
      { date: new Date(now.getFullYear(), now.getMonth(), 3), count: 3 },
      { date: new Date(now.getFullYear(), now.getMonth(), 10), count: 1 },
      { date: new Date(now.getFullYear(), now.getMonth(), 15), count: 2 },
      { date: new Date(now.getFullYear(), now.getMonth(), 20), count: 3 },
      { date: new Date(now.getFullYear(), now.getMonth(), 25), count: 1 },
      { date: new Date(now.getFullYear(), now.getMonth(), 27), count: 1 },
    ];

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
            'data-tip': `${value.date.toDateString()}: ${value.count} article`,
            style: {
                opacity: opacity,
                backgroundColor: `rgba(0, 151, 230, ${opacity})`,
              },
        }
    }

    function handleFontAfterChange(value: any){
        localStorage.setItem('record-setting-font-size', value);
    }

    function handleLightAfterChange(value: any){
        const color = tinycolor.mix('#FFFFFF', '#000000', 100-value).toHexString();
        const fontColor = tinycolor(color).isDark() ? '#fff' : '#000';
        console.log('color',color);
        setBackgroundColor(color);
        setFontColor(fontColor);
        localStorage.setItem('record-setting-background-color', color);
        localStorage.setItem('record-setting-font-color', fontColor);
        setCurColor(value);
    }

    function Overview(){
        return (
            <div className='overview-container' >
                <h3 className='overview-hint'>Read 152 books in the past year</h3>
                <CalendarHeatmap
                    startDate={new Date(now.getFullYear(), now.getMonth() - 11, 1)}
                    endDate={new Date(now.getFullYear(), now.getMonth() + 1, 0)}
                    values={data}
                    showWeekdayLabels={true}
                    tooltipDataAttrs={(value:any) => heatmapHover(value)}
                    classForValue={(value) => colorScale(value)}
                    onClick={(value) => console.log('click value: ', value)}
                />
                <div className='record-setting-container'>
                    <div className='record-setting-item'>
                        <h3 className='record-setting-title'>修改医案字体大小</h3>
                        <Slider className='record-setting-slider' 
                            defaultValue={16} min={10} max={20} step={1}
                            onAfterChange={handleFontAfterChange}
                            railStyle={{backgroundColor: '#8cc665'}}
                            trackStyle={{backgroundColor: '#8cc665'}}
                            marks={{
                                10: '10',
                                16: '16',
                                20: '20',
                            }}
                        />
                    </div>
                    <div className='record-setting-item'>
                        <h3 className='record-setting-title'>修改屏幕亮度</h3>
                        <Slider className='record-setting-slider' 
                            defaultValue={curColor} min={10} max={100} step={10}
                            onAfterChange={handleLightAfterChange}
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
            <Header className='user-navi-header'>
                <Button onClick={() => {history.push('/UserPage/Overview')}} icon={<ReadOutlined />}>Overview</Button>
                <Button onClick={() => {history.push('/UserPage/Favoriate')}} icon={<HeartOutlined />}>Favoriate</Button>
                <Button onClick={() => {history.push('/UserPage/History')}} icon={<HistoryOutlined />}>History</Button>
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
                        {/* <Route path={`/UserPage/History`}>
                            <Overview />
                        </Route>
                        <Route path={`/UserPage/Favorite`}>
                            <Overview />
                        </Route> */}
                        <Route path={`/UserPage`}>
                            <div>hello</div>
                        </Route>
                    </Switch>
                </div>
            </Content>
        </div>

    )

    return (
        <div>
            <FrameWork displayContent={userContent}/>
        </div>
    )
}