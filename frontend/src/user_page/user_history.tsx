import { Table, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useHistory } from 'react-router-dom';
import './user_history.css'

interface DataType {
    compoundKey: React.Key;
    title: string;
    abstract: string;
    time: string;
};

export default function UserHistory(){
    const [data, setData] = React.useState<DataType[]>([]);
    const [dataCnt, setDataCnt] = React.useState(0);
    const [firstColWidth, setFirstColWidth] = React.useState('10%' as string);
    const history = useHistory();
    const pagination = {
        pageSize: 10,
        total: dataCnt,
    }
    const columns:ColumnsType<DataType> = [
        {
            title: '日期',
            dataIndex: 'time',
            width: firstColWidth,
            key: 'compoundKey',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                const dateA = new Date(a.time);
                const dateB = new Date(b.time);
                return dateA.getTime() - dateB.getTime();
            },
            showSorterTooltip:{
                title: '按日期排序',
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'compoundKey',
            width: '20%',
            render: (_:any, record:any) => (
                <a onClick={() => handleClickRow(record)}>{record.title}</a>
            ),
        },
        {
            title: '摘要',
            dataIndex: 'abstract',
            width: '30%',
        }
    ]

    function handleClickRow(record:any){
        const recordID = record.compoundKey.split('-')[0];
        history.push(`/Dashboard/RecordList/RecordDetail/id=${recordID}`);
    }

    useEffect(() => {
        const url = 'http://127.0.0.1:8080/api/user/viewHistory/' + localStorage.getItem('userID');
        console.log(url);
        axios.get(url)
        .then((res) => {
            // 设置数据
            const data = res.data;
            let data_list: DataType[] = [];
            for(let i = 0; i < data.length; i++){
                data_list.push({
                    compoundKey: data[i].id+'-'+data[i].time,
                    title: data[i].title,
                    abstract: data[i].description,
                    time: data[i].time,
                });
            }
            console.log('history data: ', data_list)
            setData(data_list);
            setDataCnt(data_list.length);
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        console.log(window.innerWidth);
        // 如果屏幕过小，则修改第一列的宽度
        if(window.innerWidth < 700){
            setFirstColWidth('20%');
        }
    }, [window.innerWidth]);

    return (
        <div className='user-history-container'>
            <Table className='history-table' columns={columns} dataSource={data} pagination={pagination} />
        </div>
    )
}
