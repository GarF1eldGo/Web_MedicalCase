import React, { useEffect, useState } from 'react';
import { InboxOutlined, } from '@ant-design/icons';
import { message, Upload, UploadProps} from 'antd';
import './upload_file.css';

const uploadURL = 'http://127.0.0.1:8080/api/rawMedicalRecord/upload';
const { Dragger } = Upload;
const props: UploadProps = {
    name: 'upload_file',
    multiple: true, // 支持批量上传
    action: uploadURL, // 上传地址
    accept: '.txt', // 限制上传文件类型
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {// 上传中
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {// 上传完成
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {// 上传失败
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {// 拖拽上传
      console.log('Dropped files', e.dataTransfer.files);
    },

    beforeUpload(file, FileList) {// 上传前检查文本类型
      const isTxt = file.type === 'text/plain';
      if (!isTxt) {
        message.error('请上传txt文件!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('请保证文件小于2M!');
      }
      return isTxt && isLt2M;
    },
};


export default function AddFile(){
    let test = document.getElementsByClassName("main_page");
    if(test){
      //加载上传页面
      return (
        <div className='upload-box-container'>
          <div className='upload-box'>
          <Dragger className='dragger' {...props} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.<br></br> Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
         </div>
        </div>
        
      );
    }else{
      return <div></div>;
    }
}
