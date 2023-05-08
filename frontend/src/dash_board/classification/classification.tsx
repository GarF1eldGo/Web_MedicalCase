import { Row, Col, Tabs, TabsProps, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import './classification.css';
import axios from 'axios';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import ClassificationCircle from './classification_circle';
import ClassificationList from './classification_list';

export default function ClassificationDisease(){
  const history = useHistory();
  const match = useRouteMatch();
  const [tagList, setTagList] = useState<any[]>([]);
  const [tagType, setTagType] = useState<String>('disease');
  // const tagList : any = [];
  const tabItems: TabsProps['items'] = [
    {
      key: 'disease',
      label: '疾病',
    },
    {
      key: 'cure',
      label: '治法',
    },
    {
      key: 'dia',
      label: '辨证',
    }
  ];

  // 切换tab页，获取tag列表
  const onChangeTab = (key: string) => {
    const url = 'http://127.0.0.1:8080/api/rawMedicalRecord/tagList/' + key;
    setTagType(key);
    axios.get(url)
    .then((res) => {
      const itemPerRow = 6;
      let tmpList: any[] = [];
      for(let i = 0; i < res.data.length; i += itemPerRow){
        tmpList.push(res.data.slice(i, i + itemPerRow));
      }
      setTagList(tmpList);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const itemOnClick = (e: any) => {
    let tagName = e.target.innerText;
    // 判断是否存在...并删除
    if(tagName.indexOf('...') !== -1){
      tagName = tagName.substring(0, tagName.indexOf('...'));
    }
    history.push(`/Dashboard/Classification/Detail/tag=${tagType}-${tagName}`);
  };

  useEffect(() => {
    onChangeTab('disease');
  }, []);

  function TagListShow(){
    return (
      <div className='classification-container'>
        <Tabs
          className='header-tabs'
          centered
          defaultActiveKey='cure'
          onChange={onChangeTab}
          type="card"
          items={tabItems}
        />
        <div className='tag-container'>
          {tagList.map((row:any, rowIndex:number) => (
            <div className='tag-row'>
              <Row key={rowIndex} justify="space-evenly" align="middle" gutter={[16,16]}>
              {row.map((item:any, itemIndex:any) => (
                <Col span={3} key={itemIndex} className='tag-col'>
                  <span className='tag-item' onClick={itemOnClick}>{item}</span>
                </Col>
              ))}
              </Row>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/Detail`}>
          <ClassificationList />
        </Route>
        <Route path={`${match.path}`}>
          {/* <TagListShow /> */}
          <div className='classification-container'>
            <Tabs
              className='header-tabs'
              centered
              defaultActiveKey='disease'
              onChange={onChangeTab}
              type="card"
              items={tabItems}
            />
            <ClassificationCircle />
            {/* <div className='tag-container'>
              {tagList.map((row:any, rowIndex:number) => (
                <div className='tag-row'>
                  <Row key={rowIndex} justify="space-evenly" align="middle" gutter={[16,16]}>
                  {row.map((item:any, itemIndex:any) => (
                    <Col span={3} key={itemIndex} className='tag-col'>
                      <span className='tag-item' onClick={itemOnClick}>{item}</span>
                    </Col>
                  ))}
                  </Row>
                  <Divider />
                </div>
              ))}
            </div> */}
          </div>
        </Route>
      </Switch>
    </div>
  )
};
