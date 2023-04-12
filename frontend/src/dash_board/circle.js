import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CirclePacking } from '@ant-design/plots';

export function DemoCirclePacking(){
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
        children: []
      };
      if(item.children){
        child.children=parseData(item).children;
      }
      result.children.push(child);
    }
    result.value = parseInt(Math.random()*(400+1),10);;
    console.log('cnt = ', cnt, 'result = ', result)
    return result;
  }

  const asyncFetch = () => {
    // fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json')
    fetch('http://127.0.0.1:8080/api/rawMedicalRecord/classification/disease')
      .then((response) => response.json())
      .then((json) => setData(parseData(json)) )
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

  return <CirclePacking {...config} />;
};
