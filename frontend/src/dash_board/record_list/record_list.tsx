import React, {useState, useEffect} from "react";
import {Table, Input, Space} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import RecordRead from "./record_read";
import './record_list.css'

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string[];
}

const {Search} = Input;

export default function RecordList(props: any){
    const [data, setData] = useState<DataType[]>([]);
    const [clickRow, setClickRow] = useState<boolean>();
    const history = useHistory();
    
    function handleClickRow(record: DataType) {
        setClickRow(true);
        localStorage.setItem('record', JSON.stringify(record));
    }

    // 列表信息
    const columns: ColumnsType<DataType> = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            // 根据key值添加跳转链接
            render: (_,  record ) => (
                <a onClick={() => handleClickRow(record)}>{record.title}</a>
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
            width: '20%',
        },
    ];

    function handleSearch(value: string) {
        console.log(value);
        axios.get('http://127.0.0.1:8080/api/rawMedicalRecord/author/' + value)
        .then((response) =>  {
            // 清空data
            setData([]);
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
    }

    function displayRecord() {
        if (clickRow) {
          return <RecordRead />;
        } else {
          return <>
                <Space style={{width:'100%', justifyContent:'center'}}>
                    <Search className="search-input" addonBefore="作者" placeholder="请输入" onSearch ={handleSearch} allowClear />
                </Space>
                    
                    <Table className="class-conatiner" columns={columns} dataSource={data} />;
                </>
        }
      }

    return (
       <>
            {displayRecord()}
       </>
    )
}