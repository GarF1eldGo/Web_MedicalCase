import React, {useState, useEffect} from 'react';
import { Typography, Divider, Tag } from 'antd';
import {useHistory} from 'react-router-dom';

import SideNav from '../side_navi/side_navi';
import {DemoCirclePacking} from '../circle.js'
import AddFile from '../upload_file/upload_file';

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string[];
}

export default function RecordRead(props: any) {
    // 接收record_list数据
    const [page_key, setPageKey] = useState(1);
    const [data, setData] = useState<DataType>();
    const { Title, Paragraph, Text } = Typography;
    const history = useHistory();

    // 监听record变化
    useEffect(() => {
        const record = localStorage.getItem('record');
        if (record) {
            setData(JSON.parse(record));

            console.log('pathname:', window.location.pathname)
            const pathname = window.location.pathname;
            history.push({pathname: pathname + '/record_detail'})
        }
    }, []);

    // 监听data变化
    useEffect(() => {
        console.log('record_detail:', data);
    }, [data]);

    function displayContent(){
        return (
            <div>
                {data && (
                // 居中显示
                <Typography style={{ textAlign: 'center' }}>
                    <Title>{data.title}</Title>
                    <Paragraph>
                        <Text strong>摘要：</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>标签：</Text>

                        <Tag color="blue" key="tag">{data.tags}</Tag>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>内容：</Text>
                        {data.abstract}
                    </Paragraph>
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

        // 条件渲染
    function SelectContent(props: any){
        if(props.selectKey === 1){
            return <>{displayContent()}</>
        }else if(props.selectKey === 2){
            return <DemoCirclePacking />
        }else if(props.selectKey === 3){
            return <AddFile />
        }else{
            return <div>404</div>
        }
    }

    // 展示医案详细内容
    return (
        <SideNav displayContent={<SelectContent selectKey={page_key}/>} changePageKey={setPageKey} currentPath={props.currentPath}/>
        // <>{displayContent()}</>
    );
}