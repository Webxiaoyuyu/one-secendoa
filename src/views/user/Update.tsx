/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getAdminInfoSelf, editAdminInfoSelf } from '@/service/index';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Update() {
  const navigator = useNavigate();
  console.log(navigator);
  const [Info, setInfo] = useState<Awaited<ReturnType<typeof getAdminInfoSelf>>['data']['data']>();
  useEffect(() => {
    getAdminInfoSelf().then((res) => {
      setInfo(res.data.data);
    });
  }, []);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://img1.baidu.com/it/u=1940264460,1631511684&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    },
  ]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  interface IValues {
    username: string;
    password: string;
  }

  const onFinish = (values: IValues) => {
    console.log('Success:', values);
    if (fileList[0].response !== undefined) {
      editAdminInfoSelf({
        avatarUrl: fileList[0].response.url,
        realName: values.username,
        mobileNumber: values.password,
      }).then((res) => {
        console.log(res.data.msg);
        message.success(res.data.msg, 1, () => {
          navigator('/home');
        });
      });
    } else {
      editAdminInfoSelf({
        avatarUrl: null,
        realName: values.username,
        mobileNumber: values.password,
      }).then((res) => {
        message.error(res.data.msg, 3);
      });
    }
  };
  return (
    <div>
      <div className="p-[20px]">
        <div className=" py-[16px] px-[20px] text-[#333] text-[20px] font-bold">个人信息设置</div>
        <div className=" w-[600px] px-[50px]">
          <Form
            name="basic"
            className=" !ml-[-100px]"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="头像">
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop>
              <div className=" text-[12px] text-[#999]">
                <div>上传格式:jpg,jpeg,png,webp</div>
                <div>最大限制2MB</div>
              </div>
            </Form.Item>
            <Form.Item
              label="真实姓名"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={Info?.realName} />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input placeholder={Info?.mobileNumber} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
