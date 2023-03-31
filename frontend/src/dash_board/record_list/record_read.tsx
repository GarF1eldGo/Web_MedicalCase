import React, {useState, useEffect} from 'react';
import { Typography, Divider, Tag } from 'antd';
import SideNav from '../side_navi/side_navi';


interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string[];
}

export default function RecordRead(props: any) {
    // 接收record_list数据
    const [data, setData] = useState<DataType>();
    const { Title, Paragraph, Text } = Typography;

    useEffect(() => {
        const record = localStorage.getItem('record');
        if (record) {
            setData(JSON.parse(record));
            localStorage.removeItem('record');
        }
    }, []);

    // 监听data变化
    useEffect(() => {
        console.log('record_detail:', data);
    }, [data]);


    // 展示医案详细内容
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
    );
}