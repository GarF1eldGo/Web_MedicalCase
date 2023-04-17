import React, {useState, useEffect} from 'react';
import { Typography, Breadcrumb, Tag } from 'antd';
import axios from 'axios';

import './record_read.css'
import { useHistory, useRouteMatch } from 'react-router-dom';

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    content: string;
    tags: string;
    author: string;
}

export default function RecordRead(props: any) {
    // 接收record_list数据
    const [data, setData] = useState<DataType>();
    const [tagList, setTagList] = useState<string[]>([]);
    const [fontSize, setFontSize] = useState<number>(parseInt(localStorage.getItem('record-setting-font-size') || '16'));
    const { Title, Paragraph, Text } = Typography;
    const history = useHistory();
    const match = useRouteMatch();

    // 监听url变化
    useEffect(() => {
        const url = window.location.href;
        if(url.indexOf('id=') !== -1){
            const id = url.substring(url.indexOf('id=') + 3);
            console.log('get record', url);
            axios.get(`http://127.0.0.1:8080/api/rawMedicalRecord/record/${id}`)
            .then((res) => {
                const result = res.data;
                let tags = '';
                for(let j = 0; j < result.tags.length; j++){
                    if (result.tags[j] !== '' && j !== result.tags.length - 1) {
                        tags += result.tags[j] + ' ' ;
                    }
                    else if (result.tags[j] !== '' && j === result.tags.length - 1) {
                        tags += result.tags[j];
                    }
                }
                
                setTagList(tags.split(' '));
                setData({
                    key: res.data.id,
                    title: res.data.title,
                    abstract: res.data.content.substring(0, 100),
                    content: res.data.content,
                    tags: tags,
                    author: res.data.author,
                });
                // 更新历史记录
                
                var date = new Date();
                const curTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
                axios.post('http://127.0.0.1:8080/api/user/updateHistory',{
                    "userID" : localStorage.getItem('userID'),
                    "recordID" : res.data.id,
                    "title" : res.data.title,
                    "description" : res.data.content.substring(0, 20),
                    "time" : curTime
                }).then((res) => {
                    console.log('update history: ', res);
                }
                ).catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            })
        } 
    }, [window.location.href]);

    useEffect(() => {
        console.log('fontSize', fontSize);
        console.log('localStorage.getItem(record-setting-font-color)', localStorage.getItem('record-setting-font-size'));
        const newFontSize = parseInt(localStorage.getItem('record-setting-font-size') || '16');
        setFontSize(newFontSize);
    }, [localStorage.getItem('record-setting-font-color')]);

    function featureDisplay(content: string) {
        const reg = /初诊|辨证|治法|主方|二诊|三诊|四诊|五诊|六诊|七诊|八诊|九诊|按语/g;
        const result = content.replace(reg, (match) => {
            return `<br/><strong>${match}</strong>`
        })


        return (
            <div dangerouslySetInnerHTML={{ __html: result }} />
        )
    }

    function displayContent(){
        return (
            <div className='record-read-container'>
                <div className="bread-container">
                    <Breadcrumb className="bread-crumb" items={[
                        {title:<a href='/Home'>Home</a>},
                        {title:<a href={'/Dashboard/RecordList'}>Search Record</a>},
                        {title:'Read Record'}
                        ]} />
                </div>
                {data && (
                // 居中显示
                <Typography style={{ textAlign: 'center' }}>
                    <Title>{data.title}</Title>
                    <Paragraph>
                        <Text strong>作者:</Text>
                        <span>{data.author}</span>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>标签：</Text>
                        {tagList.map((tag) => {
                            let color = 'blue';
                            if (tag.indexOf('dia') === 0) {
                                color = 'geekblue';
                                tag = tag.substring(4);
                            } else if (tag.indexOf('disease') === 0) {
                                color = 'green';
                                tag = tag.substring(8);
                            } else if (tag.indexOf('cure') === 0) {
                                color = 'volcano';
                                tag = tag.substring(5);
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </Paragraph>
                    <div className='record-content-container'>
                        <Paragraph style={{whiteSpace:'pre-wrap', textAlign:'left', fontSize:`${fontSize}px`}}>
                            <Text strong>内容：</Text>
                            {featureDisplay(data.content)}
                        </Paragraph>
                    </div>
                </Typography>
                )}
            </div>
        )
    }

    useEffect(() => {
        // 将 localStorage 中的内容保存到 sessionStorage 中
        const saveData = () => {
          const record = localStorage.getItem('record');
          if( record ) {
            sessionStorage.setItem('record', record);
            console.log('save record:', record);
          }
        };
        window.addEventListener('beforeunload', saveData);
    
        // 在页面加载时，从 sessionStorage 中读取数据并恢复 localStorage 中的内容
        const restoreData = () => {
          const record = sessionStorage.getItem('record');
          console.log('load record:', record);
          if (record) {
            localStorage.setItem('record', record);
            sessionStorage.removeItem('record');
          }
        };
        window.addEventListener('load', restoreData);
    
        // 在组件卸载时移除事件监听器
        return () => {
          window.removeEventListener('beforeunload', saveData);
          window.removeEventListener('load', restoreData);
        };
    }, []);

    // 展示医案详细内容
    return (
        <>{displayContent()}</>
    );
}