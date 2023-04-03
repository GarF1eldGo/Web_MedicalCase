import React, {useState, useEffect} from "react";
import {Table, Input, Space} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
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
    const location = useLocation();
    
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

    // 页面加载时获取数据
    useEffect(() => {
        const params = localStorage.getItem('params');
        if(params){
            // 删除前后的引号
            console.log("load in");
            let author = params.split('=')[1];
            if(author && author.endsWith('"')){
                author = author.substring(1, author.length - 1);
            }
            handleSearch(author);
            localStorage.removeItem('params');
        }

        // // 更新URL
        // if (!location.pathname.endsWith('/Dashboard/record_list')){
        //     history.push({pathname:'/Dashboard/record_list'})
        // }
        
    }, []);


    function handleSearch(value: string) {
        // 修改URL
        let pathname = window.location.pathname;
        if(!pathname.endsWith('/record_list')){
            pathname = pathname + '/record_list';
        }
        // history.push({pathname:pathname, search:'?author='+value})
        // // 保存参数
        // localStorage.setItem('params', JSON.stringify(window.location.search));

        const encodedAuthor = encodeURIComponent(value);
        axios.get('http://127.0.0.1:8080/api/rawMedicalRecord/author/' + encodedAuthor)
        .then((response) =>  {
            // 清空data
            // setData([]);
            const result = response.data;
            let tempData: DataType[] = [];
            for(let i = 0; i < result.length; i++){
                console.log(result[i].title)
                tempData.push({
                    key: i,
                    title: result[i].title,
                    abstract: result[i].content,
                    tags: result[i].author,
                })
                console.log('Record list', tempData)
            }
            setData(tempData);
            console.log('Record list - 1', data)
        }).catch((error) => {
            console.log(error);
        })

    }

    function displayRecord() {
        if (clickRow) {
          return <RecordRead currentPath={location.pathname}/>;
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
       <>{displayRecord()}</>
    )
}