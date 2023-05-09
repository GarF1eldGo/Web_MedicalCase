import React, { useState, useEffect, Children } from 'react';
import { CirclePacking, CirclePackingConfig  } from '@ant-design/plots';
import axios from 'axios';
import BubbleChart from './react-bubble-chart-d3';
import './classification_circle.css'

export default function ClassificationCircle(){
    const [data, setData] = useState([]);

    useEffect(() => {
        // asyncFetch();
    }, []);
    
    const asyncFetch = () => {
        axios.get('http://127.0.0.1:8080/api/rawMedicalRecord/classification/disease')
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
            console.log('fetch data failed', error);
        });
    };

    const config : CirclePackingConfig  = {
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
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle', // 'top', 'bottom', 'middle',
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                { type: 'interval-adjust-position' },
                // 数据标签文颜色自动调整
                { type: 'interval-hide-overlap' },
                // 数据标签文颜色自动调整
                { type: 'adjust-color' },
            ],
        },
        legend: false,
        drilldown: {
            enabled: true,
            breadCrumb: {
                position: "top-left",
            },
        },
        onEvent: (event, chartInstance) => {
            if(event.type === 'click') {
                console.log(event)
            }
        }
    };

    const longData = [
        { key: 'Department of Curtains and Interior Design', data: 100 },
        { key: 'Fresh Kitchen Pasta Dish and Pizza', data: 45 },
        { key: 'Short Name', data: 25 }
      ];

     const bubbleClick = (label:any) =>{
        console.log("Custom bubble click func ", label)
      }
     const legendClick = (label:any) =>{
        console.log("Customer legend click func")
      }
    return (
        // <CirclePacking {...config}/>
        <div className='classification_circle_container'>
            <BubbleChart
            graph={{
                zoom: 1,
                offsetX: 0,
                offsetY: 0
            }}
            width={600}
            height={600}
            showLegend={true} // optional value, pass false to disable the legend.
            legendPercentage={20} // number that represent the % of with that legend going to use.
            valueFont={{
                family: "Arial",
                size: 20,
                color: "#fff",
                weight: "bold"
            }}
            labelFont={{
                family: "Arial",
                size: 15,
                color: "#fff",
                weight: "normal"
            }}
            //Custom bubble/legend click functions such as searching using the label, redirecting to other page
            bubbleClickFun={bubbleClick}
            legendClickFun={legendClick}
            data={[
                { label: "Net Banking", value: 5, color: "#F08871" },
                { label: "great", value: 10, color: "#6EB97B" },
                { label: "Credit Card", value: 3, color: "#5496F6" },
                { label: "Debit Card", value: 3, color: "#F08871" },
            ]}
            />
        </div>
    )
}