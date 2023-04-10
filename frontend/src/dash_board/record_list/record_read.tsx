import React, {useState, useEffect} from 'react';
import { Typography, Breadcrumb, Tag } from 'antd';

import './record_read.css'

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
    const { Title, Paragraph, Text } = Typography;

    // 监听record变化
    useEffect(() => {
        const record = localStorage.getItem('record');
        if (record) {
            setData(JSON.parse(record));
        }
    }, []);

    // 监听data变化
    useEffect(() => {
        console.log('record_detail:', data);
        if (data) {
            // 按照空格进行分割
            const tags = data.tags.split(' ');
            setTagList(tags);
        }
    }, [data]);

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
                            } else if (tag.indexOf('diease') === 0) {
                                color = 'green';
                                tag = tag.substring(7);
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
                        <Paragraph style={{whiteSpace:'pre-wrap', textAlign:'left'}}>
                            <Text strong>内容：</Text>
                            {data.content}
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