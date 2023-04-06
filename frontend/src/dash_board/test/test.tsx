import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import RecordList from '../record_list/record_list';
import AddFile from '../upload_file/upload_file';
import { DemoCirclePacking } from '../circle';
import './test.css'


export default function Test(){
    return (
        <div className='main-page-container'>
            <div className='left'>
                    <p>Navigator</p>
                </div>
                <div className='divider-left'></div>
                <div className='center'>
                    <Switch>
                        <Route path={`/test/RecordList`}>
                            <RecordList />
                        </Route>
                        <Route path={`/test/Classification`}>
                            <DemoCirclePacking />
                        </Route>
                        <Route path={`/test/AddFile`}>
                            <AddFile />
                        </Route>
                    </Switch>
                </div>
                <div className='divider-right'></div>
                <div className='right'>
                    <p>Related Articles</p>
                </div>
        </div>
    )
}