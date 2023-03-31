import React, {useState, useEffect} from "react";
import {Table, Tag, Typography} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string[];
}


export default function RecordList({chanegSelectedKey} : any){
    const {Link} = Typography;
    const [data, setData] = useState<DataType[]>([]);


    // // 点击链接跳转
    // const handleClick = (record: DataType) => {
    //     localStorage.setItem('record', JSON.stringify(record));
    //     console.log('record-2', record);
    // };
    
    // 列表信息
    const columns: ColumnsType<DataType> = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            // 根据key值添加跳转链接
            render: (_,  record ) => (
                // <Link href="/record_detail" onClick={() => handleClick(record)}>{record.title}</Link>
                <a onClick={() => {
                    localStorage.setItem('record', JSON.stringify(record));
                    chanegSelectedKey();
                }}>
                    {record.title}
                </a>
                
            ),
            
            width: '20%',
        },
        {
            title: '摘要',
            dataIndex: 'abstract',
            width: '30%',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
        },
    ];
   
    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/rawMedicalRecord/author/马保国')
        .then((response) =>  {
            const result = response.data;
            for(let i = 0; i < result.length; i++){
                console.log(result[i].title)
                setData((data) => [
                    ...data,
                    {
                        key: i,
                        title: result[i].title,
                        abstract: result[i].content,
                        tags: result[i].author,
                    }
                ])
                console.log('Record list', data)
            }
            
        }).catch((error) => {
            console.log(error);
        })
    }, [])
   

    return (
        <Table columns={columns} dataSource={data}  />
    )
}