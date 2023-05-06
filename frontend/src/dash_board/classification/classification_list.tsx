import React, { useState, useEffect } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import './classification_list.css';
import { Breadcrumb, Table, Tag } from 'antd';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axios from 'axios';

interface DataType {
    key: React.Key;
    title: string;
    abstract: string;
    tags: string;
    author: string;
};

export default function ClassificationList(){
    const [tagType, setTagType] = useState<String>();
    const [tagName, setTagName] = useState<String>();
    const [data, setData] = useState<DataType[]>([]);
    const history = useHistory();

    function handleClickRow(record: DataType){
        history.push(`/Dashboard/RecordList/RecordDetail/id=${record.key}`);
    }

    const columns : ColumnsType<DataType> = [
        {
            key: 'title',
            title: '标题',
            dataIndex: 'title',
            width: '20%',
            render: (_,  record ) => (
                <a onClick={() => handleClickRow(record)}>{record.title}</a>
            ),
        },
        {
            key: 'abstract',
            title: '摘要',
            dataIndex: 'abstract',
            width: '40%',
        },
        {
            key: 'tags',
            title: '标签',
            dataIndex: 'tags',
            width: '20%',
            render:  (_, {tags}) => {
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
            },
        }
    ];

    useEffect(() => {
        //从url中获取tag
        const url = window.location.href;
        const tag = url.substring(url.indexOf('tag=') + 4);
        // 分隔tag
        let tagType = tag.substring(0, tag.indexOf('-'));
        let tagName = tag.substring(tag.indexOf('-') + 1);
        const englishType = tagType;
        // 处理中文乱码
        tagName = decodeURI(tagName);

        if (tagType === 'disease') {
            tagType = '疾病';
        } else if (tagType === 'cure') {
            tagType = '治法';
        } else if (tagType === 'dia') {
            tagType = '辨证';
        }
        
        setTagName(tagName);
        setTagType(tagType);

        const getUrl = 'http://127.0.0.1:8080/api/rawMedicalRecord/tagListRecord/' + englishType + '/' + encodeURIComponent(tagName);
        axios.get(getUrl)
        .then((res) => {
            const data = res.data;
            const newData = [];
            for (let i = 0; i < data.length; i++) {
                let tags = '';
                for(let j = 0; j < data[i].tags.length; j++){
                    if (data[i].tags[j] !== '' && j !== data[i].tags.length - 1) {
                        tags += data[i].tags[j] + ' ' ;
                    }
                    else if (data[i].tags[j] !== '' && j === data[i].tags.length - 1) {
                        tags += data[i].tags[j];
                    }
                }
                const record = data[i];
                const newRecord = {
                    key: record.id,
                    title: record.title,
                    abstract: record.content.substring(0,20),
                    tags: tags,
                    author: record.author,
                };
            newData.push(newRecord);
            }
            setData(newData);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    return (
        <div className="classification-list-container">
            <Breadcrumb className="classification-list-breadcrumb" items={[
                {title:<a href='/Home'>主页</a>},
                {title:<a href={'/Dashboard/Classification'}>医案分类</a>},
                {title:'医案列表'}
            ]} />
            <div className='table-list'>
                <h1>{tagType} : {tagName}</h1>
                <Table className='tag-list-table' columns={columns} dataSource={data} />
            </div>
        </div>
    )
}