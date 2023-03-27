import React from 'react';
import { InboxOutlined, } from '@ant-design/icons';
import { message, Upload, UploadProps} from 'antd';
import './upload_file.css';

const { Dragger } = Upload;
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
};


export default function AddFile(){
    let test = document.getElementsByClassName("main_page");
    if(test){
      //加载上传页面
      return (
        <div className='upload_box'>
          <Dragger {...props} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
         </div>
      );
    }else{
      return <div></div>;
    }
}
