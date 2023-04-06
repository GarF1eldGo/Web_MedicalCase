import React, {useState, useEffect} from "react";
import {Table, Input, Space, Select, Breadcrumb} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import {Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';
import RecordRead from "./record_read";
import './record_list.css'

const {Option} = Select;

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string[];
}

const {Search} = Input;

export default function RecordList(){
    const [data, setData] = useState<DataType[]>([]);
    const [clickRow, setClickRow] = useState<boolean>();
    const match = useRouteMatch();
    const history = useHistory();
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelectChange = (value:any) => {
        console.log(`selected ${value}`);
        setSelectedValue(value);
    };

    const selectBefore = (
        <Select defaultValue="全局搜索" onChange={handleSelectChange}>
          <Option value="searchAll">全局搜索</Option>
          <Option value="author">作者</Option>
          <Option value="tag">标签</Option>
          <Option value="content">医案内容</Option>
        </Select>
    );

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

    // TODO：有待完善
    // 页面加载时获取数据
    useEffect(() => {
        const params = localStorage.getItem('params');
        if(params){
            // 删除前后的引号
            let author = params.split('=')[1];
            if(author && author.endsWith('"')){
                author = author.substring(1, author.length - 1);
            }
            handleSearch(author);
            localStorage.removeItem('params');
        }

    }, []);

    function handleClickRow(record: DataType) {
        setClickRow(true);
        localStorage.setItem('record', JSON.stringify(record));
        history.push(`${match.path}/RecordDetail/${record.title}`);
    }

    function handleSearch(value: string) {
        // 根据搜索类型定义URL
        let url = 'http://127.0.0.1:8080/api/rawMedicalRecord';
        let newPathname = '';
        const encodedValue = encodeURIComponent(value);
        // console.log('selected value:', selectedValue);
        if(selectedValue === 'searchAll'){
            url += '/searchAll/' + encodedValue;
            newPathname = `${match.path}/searchAll=${value}`;
        }else if (selectedValue === 'author'){
            url += '/author/' + encodedValue;
            newPathname = `${match.path}/author=${value}`;
        }else if (selectedValue === 'tag'){
            url += '/tag/' + encodedValue;
            newPathname = `${match.path}/tag=${value}`;
        }else if (selectedValue === 'content'){
            url += '/content/' + encodedValue;
            newPathname = `${match.path}/content=${value}`;
        }else{
            url += '/searchAll/' + encodedValue;
            newPathname = `${match.path}/searchAll=${value}`;
        }

        axios.get(url)
        .then((response) =>  {
            // 清空data
            setData([]);
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
                
            }
            setData(tempData);
            history.push(newPathname);
        }).catch((error) => {
            console.log(error);
        })

    }

    function SearchRecord() {
        return (
            <div className="record-list-container">
                <div className="bread-container">
                        <Breadcrumb className="bread-crumb" items={[
                            {title:<a href='/Home'>Home</a>},
                            {title:'Search Record'}
                            ]} />
                </div>
                <div className="search-record-container">
                    <Space style={{width:'100%', justifyContent:'center'}}>
                        <Search className="search-input" addonBefore={selectBefore} placeholder="请输入" onSearch ={handleSearch} allowClear />
                    </Space>
                    <Table className="record-table" columns={columns} dataSource={data} />
                </div>
            </div>
            
        )
    }

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/RecordDetail`}>
                    <RecordRead />
                </Route>
                {/* <Route path={`${match.path}/author`}>
                    <SearchRecord />
                </Route> */}
                <Route path={`${match.path}`}>
                    <SearchRecord />
                </Route>
            </Switch>
        </div>
    )
}