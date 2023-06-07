/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { editAdminUpdatepwd } from '@/service/index';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Pwd() {
  const navigator = useNavigate();

  interface IValues {
    oldpassword: string;
    newpassword: string;
    confirm: string;
  }

  const onFinish = (values: IValues) => {
    console.log('Success:', values);
    editAdminUpdatepwd({
      adminPwd: values.newpassword,
      oldpwd: values.oldpassword,
      confirmPwd: values.confirm,
    }).then((res) => {
      if (res.data.code === 200) {
        message.success(res.data.msg, 1, () => {
          navigator('/home');
        });
      } else {
        message.error(res.data.msg, 2);
      }
    });
  };
  return (
    <div>
      <div className="p-[20px]">
        <div className=" py-[16px] px-[20px] text-[#333] text-[20px] font-bold">个人信息设置</div>
        <div className=" w-[600px] px-[50px]">
          <Form
            name="basic"
            className=" !ml-[-100px] !h-[350px] flex flex-col justify-around"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="oldpassword"
              label="旧密码"
              rules={[
                {
                  required: true,
                  message: '请输入旧密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newpassword"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newpassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
