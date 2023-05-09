import React, { useState, useEffect, Children } from 'react';
import { useHistory } from 'react-router-dom';
import { CirclePacking, CirclePackingConfig  } from '@ant-design/plots';
import axios from 'axios';
import BubbleChart from './react-bubble-chart-d3';
import './classification_circle.css'
import { type } from '@testing-library/user-event/dist/type';
import { local } from 'd3';

export default function ClassificationCircle(props:any){
    const [data, setData] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        console.log('tagData', props.tagData);
    }, []);

    useEffect(() => {
        setData(props.tagData);
    }, [props.tagData]);

     const bubbleClick = (label:any, recordID:any) =>{
        console.log('label', label, 'recordID', recordID);
        if (recordID != null) {
            console.log('recordID', recordID);
            history.push('/Dashboard/RecordList/RecordDetail/id=' + recordID)
        }else{
            const type = localStorage.getItem('tagType');
            const url = 'http://127.0.0.1:8080/api/rawMedicalRecord/tagListRecord/' + type + "/" + label;
            console.log(url)
            axios.get(url)
            .then((res) => {
                
                let tmpData : any = [];
                for (let i = 0; i < res.data.length; i++) {
                    const label = res.data[i].title;
                    tmpData.push({label: label, value: 1, recordId: res.data[i].id});
                }
                setData(tmpData);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        
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
            width={800}
            height={800}
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
            data={data}
            />
        </div>
    )
}