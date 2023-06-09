import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getAdminAdd } from '@/service/index';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';

export const AgentCss = styled.div`
  div {
    .ant-input {
      height: 40px !important;
    }
    .ant-btn {
      height: 40px;
      padding: 0 15px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
`;
const Add: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { run: runAdd } = useRequest(getAdminAdd, {
    manual: true,
    onSuccess(res) {
      messageApi.open({
        type: 'success',
        content: `${res.msg}`,
      });
    },
  });
  const onFinish = (values: any) => {
    if (values.radioGroup === undefined) {
      values.radioGroup = 1;
    }
    runAdd({
      adminName: `${values.name}`,
      mobileNumber: `${values.phone}`,
      realName: `${values.age}`,
    });
  };
  const navigate = useNavigate();
  return (
    <AgentCss className="p-[20px]">
      {contextHolder}
      <div className="flex px-[24px] py-[16px]">
        <div className="mx-[8px] mr-[16px] text-[16px]" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </div>
        <div className="pr-[12px] text-[#333333] font-semibold text-[20px] leadding-[32px]">
          新增管理员
        </div>
      </div>
      {/* 表单部分 */}
      <div className="w-[600px] px-[50px]">
        {/* 表单上 */}
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="账户名称" rules={[{ required: true }]}>
            <Input placeholder="请输入账户名称" />
          </Form.Item>
          <Form.Item name="age" label="真实名称" rules={[{ required: true }]}>
            <Input placeholder="请输入真实姓名" />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
          {/* 按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AgentCss>
  );
};

export default Add;
