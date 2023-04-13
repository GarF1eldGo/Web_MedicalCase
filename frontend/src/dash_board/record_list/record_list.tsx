import React, {useState, useEffect} from "react";
import {Table, Input, Space, Select, Breadcrumb, Tag} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import {Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';
import RecordRead from "./record_read";
import './record_list.css'
import { local } from "d3";

const {Option} = Select;

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    content: string;
    tags: string;
    author: string;
}

const {Search} = Input;

export default function RecordList(){
    const [data, setData] = useState<DataType[]>([]);
    const match = useRouteMatch();
    const history = useHistory();
    const [selectedValue, setSelectedValue] = useState('全局搜索');
    const [dataCnt, setDataCnt] = useState(0);
    const abstractNum = window.innerWidth > 1000 ? 20 : 10;

    const handleSelectChange = (value:any) => {
        console.log(`selected ${value}`);
        setSelectedValue(value);
    };

    const pagination = {
        pageSize:10,
        total: dataCnt,
    };

    const options = [
        { label: '全局搜索', value: 'searchAll' },
        { label: '作者    ', value: 'author' },
        { label: '标签    ', value: 'tag' },
        { label: '医案内容', value: 'content' },
        { label: '医案标题', value: 'title'}
    ];

    const selectBefore = (
        <Select defaultActiveFirstOption options={options} value={selectedValue} onChange={handleSelectChange} />
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
            render: (_, {tags}) => {
                // 获取屏幕宽度
                const screenWidth = window.innerWidth;
                // 根据屏幕宽度设置tag数量
                let tagNum = 0;
                if (screenWidth >= 1200) {
                    tagNum = 5; // 大屏幕电脑上显示5个tag
                } else if (screenWidth >= 768) {
                    tagNum = 3; // 平板电脑或手机横屏上显示3个tag
                } else {
                    tagNum = 2; // 手机竖屏上显示2个tag
                }
                // 根据tagNum设置显示数量
                const tagList = tags.split(' ').slice(0, tagNum);
                return (
                    <>
                        {
                            tagList.map((tag) => {
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
                            })
                        }
                    </>
                );
            }
        },
    ];

    // 页面加载时获取数据
    useEffect(() => {
        let value = localStorage.getItem('value')
        let type = localStorage.getItem('type')
        console.log('in record list : ', value, type)
        if(value && type){
            localStorage.removeItem('value');
            localStorage.removeItem('type');
            value = value.replaceAll('"', '')
            type = type.replaceAll('"', '')
            setSelectedValue(type)
            handleSearch(value, type);
        }
        
        return () => {
            localStorage.removeItem('value');
            localStorage.removeItem('type');
            console.log('remove value and type');
        }
    }, []);

    function handleClickRow(record: DataType) {
        history.push(`/Dashboard/RecordList/RecordDetail/id=${record.key}`);
    }

    function handleSearch(value: string, searchType = selectedValue) {
        // 根据搜索类型定义URL
        let url = 'http://127.0.0.1:8080/api/rawMedicalRecord';
        let newPathname = '';
        const encodedValue = encodeURIComponent(value);
        if(searchType === 'searchAll'){
            url += '/searchAll/' + encodedValue;
            newPathname = `${match.path}/searchAll=${value}`;
        }else if (searchType === 'author'){
            url += '/author/' + encodedValue;
            newPathname = `${match.path}/author=${value}`;
        }else if (searchType === 'tag'){
            url += '/tag/' + encodedValue;
            newPathname = `${match.path}/tag=${value}`;
        }else if (searchType === 'content'){
            url += '/content/' + encodedValue;
            newPathname = `${match.path}/content=${value}`;
        }else if (searchType === 'title'){
            url += '/title/' + encodedValue;
            newPathname = `${match.path}/title=${value}`;
        }else{
            url += '/searchAll/' + encodedValue;
            newPathname = `${match.path}/searchAll=${value}`;
            console.log('url type:', searchType)
        }

        localStorage.setItem('value', JSON.stringify(value))
        localStorage.setItem('type', JSON.stringify(selectedValue))

        axios.get(url)
        .then((response) =>  {
            // 清空data
            setData([]);
            const result = response.data;
            setDataCnt(result.length);
            console.log('data cnt:', dataCnt)
            let tempData: DataType[] = [];
            for(let i = 0; i < result.length; i++){
                let tags = '';
                for(let j = 0; j < result[i].tags.length; j++){
                    if (result[i].tags[j] !== '' && j !== result[i].tags.length - 1) {
                        tags += result[i].tags[j] + ' ' ;
                    }
                    else if (result[i].tags[j] !== '' && j === result[i].tags.length - 1) {
                        tags += result[i].tags[j];
                    }
                }
                
                tempData.push({
                    key: result[i].id,
                    title: result[i].title, 
                    abstract: result[i].content.substring(0,abstractNum),
                    content: result[i].content,
                    tags: tags,
                    author: result[i].author,
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
                        <Search className="input-search" addonBefore={selectBefore} placeholder="请输入" 
                            onSearch ={(value) => handleSearch(value, selectedValue)} allowClear />
                    </Space>
                    <Table className="record-table" columns={columns} dataSource={data} pagination={pagination}/>
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
                <Route path={`${match.path}`}>
                    <SearchRecord />
                </Route>
            </Switch>
        </div>
    )
}