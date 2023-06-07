/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import loginImg from '@/assets/Login_image/login.png';
import logo from '@/assets/logo.svg';
import { getAdminVerifycode, loginIn } from '@/service/index';

export const LoginCss = styled.div`
  .login-content {
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  }
  .ant-form-item-control-input-content {
    display: flex;
    align-items: flex-end;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  // 获取验证图片
  const [verifyCodeImg, setVerifyCodeImg] =
    useState<Awaited<ReturnType<typeof getAdminVerifycode>>['data']['data']['svg']>('');
  const refCodeNo = useRef('');
  useEffect(() => {
    getAdminVerifycode().then((res) => {
      setVerifyCodeImg(res.data.data.svg);
      refCodeNo.current = res.data.data.no;
    });
  }, []);
  // 点击获取验证码
  const getCodeImg = () => {
    getAdminVerifycode().then((res) => {
      setVerifyCodeImg(res.data.data.svg);
      refCodeNo.current = res.data.data.no;
    });
  };
  interface IValue {
    code: string;
    password: string;
    username: string;
  }

  // 登录
  const onFinish = (values: IValue) => {
    console.log('Received values of form: ', values);
    loginIn({
      adminName: values.username,
      adminPwd: values.password,
      no: refCodeNo.current,
      verifyCode: values.code,
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        message.success(res.data.msg, 1, () => {
          navigate('/home');
        });
      } else {
        message.error(res.data.msg, 3);
      }
    });
  };
  return (
    <LoginCss>
      <div className="w-[100vw] h-[100vh] min-w-[1200px] overflow-hidden flex justify-center items-center">
        <div>
          {/* s上 */}
          <div className="flex items-center justify-center">
            <img className=" overflow-hidden h-[30px]" src={logo} alt="" />
            <div className=" font-medium text-[26px] ml-[20px]">一秒快送后台管理系统</div>
          </div>
          {/* 下 */}
          <div className="login-content w-[800px] h-[500px] rounded-[8px] mt-[40px] flex flex-between item-start">
            <div className="w-[400px] h-[500px] p-[40px] flex items-center justify-center">
              <img width="360px" className=" align-middle border-none" src={loginImg} alt="" />
            </div>
            <div className="w-[400px] h-[500px] p-[40px]">
              <div>
                <div className=" text-[20px] ml-[8px] text-center">账号密码登录</div>
                <div className="mt-[40px]">
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      validateTrigger={['onBlur']}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: '请输入账号',
                        },
                      ]}
                    >
                      <Input
                        className="h-[40px]"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="管理员账号"
                      />
                    </Form.Item>
                    <Form.Item
                      validateTrigger={['onBlur']}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码',
                        },
                      ]}
                    >
                      <Input
                        className="h-[40px]"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="管理员密码"
                      />
                    </Form.Item>
                    <div className=" flex items-stretch">
                      <Form.Item
                        validateTrigger={['onBlur']}
                        name="code"
                        rules={[
                          {
                            required: true,
                            message: '请输入验证码',
                          },
                        ]}
                      >
                        <Input
                          className="h-[40px] !w-[170px]"
                          prefix={<SafetyCertificateOutlined />}
                          placeholder="输入验证码"
                        />
                      </Form.Item>
                      <div className="w-[150px] h-[50px]" onClick={getCodeImg}>
                        <img
                          src={`data:image/svg+xml;base64,${btoa(verifyCodeImg)}`}
                          alt=""
                          width="150"
                          height="50"
                        />
                      </div>
                    </div>
                    <Form.Item className="">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button w-full !h-[40px] mt-[40px]"
                      >
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginCss>
  );
}
