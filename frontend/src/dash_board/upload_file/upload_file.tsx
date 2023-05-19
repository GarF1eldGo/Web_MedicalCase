import React, { useEffect, useState } from 'react';
import { InboxOutlined, } from '@ant-design/icons';
import { message, Upload, UploadProps} from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import './upload_file.css';

const uploadURL = 'http://127.0.0.1:8080/api/rawMedicalRecord/upload';
const { Dragger } = Upload;


export default function AddFile(){
    const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]); // 上传文件列表

    const props: UploadProps = {
      name: 'upload_file',
      multiple: true, // 支持批量上传
      action: uploadURL, // 上传地址
      accept: '.txt', // 限制上传文件类型
      onDrop(e) {// 拖拽上传
        console.log('Dropped files', e.dataTransfer.files);
      },

      onChange(info){
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          let tmpFileList = info.fileList.filter((file) => file.status === 'done');
          setUploadFileList(info.fileList);
          console.log('uploadFileList:', uploadFileList)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        } else {
          console.log('info.file.status:', info.file.status)
          setUploadFileList(info.fileList);
        }
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

      fileList: uploadFileList.slice(0,9),
    };
  

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
              <p className="ant-upload-text">点击或拖拽到此区域上传医案</p>
              <p className="ant-upload-hint">
                支持单文件上传和批量上传<br></br> 只能上传txt文件
              </p>
            </Dragger>
          </div>
        </div>
        
      );
    }else{
      return <div></div>;
    }
}
