import React, { useState, useEffect } from 'react';
import { CirclePacking } from '@ant-design/plots';

export default function ClassificationDisease(){
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  // 解析json数据
  function parseData(json){
    const result = {
      name: json.name,
      children: [],
      value: 0,
    };

    let cnt = 1;
    for(const key in json.data){
      const item = json.data[key];
      const child = {
        name: item.name,
        children: [],
        value: 0,
      };
      if(item.children){
        child.children=item.children;
        child.value = item.children.length * item.children.length;
        // children value
        for(const childItem of item.children){
          childItem.value = 1;
        }
      }else{
        child.value = 1;
      }
      result.children.push(child);
    }
    return result;
  }

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json')
    // fetch('http://127.0.0.1:8080/api/rawMedicalRecord/classification/disease')
      .then((response) => response.json())
      .then((json) => {
        // setData(parseData(json));
        setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  
  const config = {
    autoFit: true,
    padding: 0,
    data,
    sizeField: 'r',
    // 自定义颜色
    colorField: 'r',
    color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
    // 自定义样式
    pointStyle: {
      stroke: 'rgb(183, 55, 121)',
      lineWidth: 0.5,
    },
    label: false,
    legend: false,
    drilldown: {
      enabled: true,
      breadCrumb: {
        position: 'top-left',
      },
    },
  };

  function handleCircleClick(id){
    console.log('click', id);
  }
  const handleNodeClick = (node) => {
    if (node.link) {
      window.location.href = node.link; // 跳转链接
    }
  };
  const mydata = {
    name: 'root',
    children: [
      {
        name: 'node1',
        value: 20,
        link: '/node1', // 节点的跳转链接
      },
      {
        name: 'node2',
        value: 30,
        children: [
          {
            name: 'node3',
            value: 10,
            link: '/node3',
          },
          {
            name: 'node4',
            value: 10,
            link: '/node4',
          },
        ],
      },
    ],
  };
  return <CirclePacking className='disease-circle-packing' 
    // data={mydata}
    // />
  {...config} />;
};
