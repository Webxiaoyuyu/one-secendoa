/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Select, ConfigProvider, Popover, message, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getList, getAdminStatus, getChangeAdminPwd } from '@/service/index';
import styled from 'styled-components';
import { RedoOutlined, UserAddOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const AgentCss = styled.div`
  div {
    .ant-form-item {
      margin-right: 8px !important;
      margin-bottom: 8px !important;
      .ant-input {
        height: 40px !important;
      }
      .ant-select-selector {
        height: 40px !important;
      }
    }
    .css-dev-only-do-not-override-cbxc1s.ant-col-16 {
      max-width: 100% !important;
    }
    .buttonTop {
      .ant-btn {
        width: 120px !important;
        border-radius: 4px !important;
        height: 40px !important;
        padding: 0 15px !important;
        margin-right: 5px;
      }
    }
    .table {
      .ant-btn {
        height: 40px !important;
        padding: 0 15px !important;
        font-size: 14px !important;
        border-radius: 4px !important;
      }
      .ant-btn-icon-only {
        font-size: 14px !important;
        height: 32px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px !important;
        width: 32px !important;
      }
    }
    .ant-table-content {
      margin-top: 20px;
    }
    .ant-table-thead .ant-table-cell {
      font-weight: 500 !important;
    }
  }
`;

// 表格
interface DataType {
  key: React.Key;
  agentNo: string;
  agentAccount: JSX.Element;
  mobileNumber: string;
  realName: string;
  status: JSX.Element;
  Time: JSX.Element;
  make: JSX.Element;
}

const columns: ColumnsType<DataType> = [
  {
    title: '编号',
    dataIndex: 'agentNo',
  },
  {
    title: '账号',
    dataIndex: 'agentAccount',
  },
  {
    title: '手机号',
    dataIndex: 'mobileNumber',
  },
  {
    title: '名字',
    dataIndex: 'realName',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '时间',
    dataIndex: 'Time',
  },
  {
    title: '操作',
    dataIndex: 'make',
  },
];
const Agent: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dataSoure: DataType[] = [];
  const [loading, setLoading] = useState(false);

  // 页面初始化
  const [agentList, setAgentList]: any[] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getList({ adminNo: searchParams.get('adminNo'), current: 1, pageSize: 20 }).then((res) => {
      setAgentList(res.data?.data);
    });
  }, []);

  // 点击后渲染
  const { run: runAgentList } = useRequest(getList, {
    manual: true,
    onSuccess(res) {
      setAgentList(res.data?.data);
    },
  });
  const onFinish = (values: any) => {
    if (values.status === 1) {
      values.status = 1;
    }

    if (values.status === 2) {
      values.status = undefined;
    }
    runAgentList({
      current: 1,
      pageSize: 20,
      adminNo: searchParams.get('adminNo'),
      agentAccount: values.id || undefined,
      agentNo: values.userid || undefined,
      mobileNumber: values.phone || undefined,
      realName: values.name || undefined,
      status: values.status,
    });
  };

  const { run: runAgentList1 } = useRequest(getList, {
    manual: true,
    // setLoading(true);
    onSuccess(res) {
      setAgentList(res.data.data);
      setLoading(false);
    },
  });
  const changeLoading = () => {
    setLoading(true);
    runAgentList1({
      current: 1,
      pageSize: 20,
    });
  };
  // 通知提示框
  const [messageApi, contextHolder] = message.useMessage();

  // 点击改变
  const { run: runStatus } = useRequest(getAdminStatus, {
    manual: true,
    onSuccess(res) {
      messageApi.open({
        type: 'error',
        content: `${res.msg}`,
      });
    },
  });

  // 禁用
  const changeStatusClose = () => {
    runStatus({
      adminNo: searchParams.get('adminNo'),
      status: 0,
    });
  };

  // 开启
  const changeStatusOpen = () => {
    runStatus({
      adminNo: searchParams.get('adminNo'),
      status: 1,
    });
  };
  // 重置密码
  const { run: runPwd } = useRequest(getChangeAdminPwd, {
    manual: true,
    onSuccess(res) {
      messageApi.open({
        type: 'error',
        content: `${res.msg}`,
      });
    },
  });

  const changePwd = () => {
    runPwd({
      adminNo: searchParams.get('adminNo'),
    });
  };

  // 取消
  const Cancellation = () => {
    runAgentList({
      current: 1,
      pageSize: 20,
      agentAccount: undefined,
      agentNo: undefined,
      mobileNumber: undefined,
      realName: undefined,
      status: undefined,
    });
  };

  // 按钮里面的内容
  const content = (a: number) => (
    <div>
      {contextHolder}
      <div>
        <Button type="text">修改</Button>
      </div>
      {a === 1 ? (
        <div>
          <div>
            <Button type="text" onClick={() => changeStatusClose()}>
              禁止
            </Button>
          </div>
          <div>
            <Button type="text" disabled>
              开启
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Button type="text" disabled>
              禁止
            </Button>
          </div>
          <div>
            <Button type="text" onClick={changeStatusOpen}>
              开启
            </Button>
          </div>
        </div>
      )}
      <Button type="text" onClick={changePwd}>
        重置密码
      </Button>
    </div>
  );

  agentList?.map(
    (item: {
      adminNo: string;
      realName: string;
      agentNo: string;
      agentAccount: string;
      mobileNumber: string;
      status: number;
      updateTime: string;
      createTime: string;
      defaultPwd: number;
      updatedBy: string;
    }) => {
      dataSoure.push({
        key: item.realName,
        agentNo: `${item.adminNo}`,
        agentAccount: (
          <div>
            {item.agentAccount} <br /> 初始密码:{item.defaultPwd}
          </div>
        ),
        mobileNumber: `${item.mobileNumber}`,
        realName: `${item.realName}`,
        status:
          Number(`${item.status}`) === 1 ? (
            <span className=" text-[#52c41a] bg-[#f6ffed] border-[#b7eb8f] border border-solid block px-[7px] text-[12px] leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              启动
            </span>
          ) : (
            <span className=" text-[#f5222d] bg-[#fff1f0] border-[#ffa39e] border border-solid block px-[7px] text-[12px] leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              禁用
            </span>
          ),
        Time: (
          <span>
            创建:{item.updateTime}
            <br />
            更新:{item.createTime}
          </span>
        ),
        make: (
          <div>
            {/* 左边按钮 */}
            <UserAddOutlined style={{ color: '#955ce6' }} />
            {/* 右边 */}
            <Popover content={() => content(item.status)} trigger="hover">
              <Button type="primary" ghost>
                <EllipsisOutlined type="primary" />
              </Button>
            </Popover>
          </div>
        ),
      });
    },
  );
  const navigate = useNavigate();

  // loading
  const container = (
    <div className="table w-full">
      <div className="button flex justify-between">
        <Button type="primary" onClick={() => navigate('/user/agent/adminadd')}>
          添加管理员
        </Button>
        <Button icon={<RedoOutlined />} onClick={changeLoading} />
      </div>
      {dataSoure.length === 0 ? (
        <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={[]} />
        </ConfigProvider>
      ) : (
        <div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={dataSoure} bordered />
          <div>共有{dataSoure.length}条数据</div>
        </div>
      )}
    </div>
  );
  return (
    <AgentCss className="p-[20px]">
      <div className="text-[24px] mb-[20px]">管理员列表</div>
      {/* 表单 */}
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item>
          <Form.Item name="id" className="inline-block w-[200px]">
            <Input placeholder="代理编号" />
          </Form.Item>
          <Form.Item name="userid" className="inline-block w-[200px]">
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item name="phone" className="inline-block w-[200px]">
            <Input placeholder="手机号" />
          </Form.Item>
          <Form.Item name="name" className="inline-block w-[200px]">
            <Input placeholder="昵称" />
          </Form.Item>
          <Form.Item name="status" className="inline-block w-[200px]">
            <Select
              showSearch
              placeholder="状态"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 2,
                  label: '状态:全部',
                },
                {
                  value: 1,
                  label: '状态:启用',
                },
                {
                  value: 0,
                  label: '状态:禁用',
                },
              ]}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item name="status">
          <div className="mt-[12px] buttonTop flex">
            <Button htmlType="reset" onClick={Cancellation}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </div>
        </Form.Item>
      </Form>
      {/* 表单表格中间的空格部分 */}
      <div className=" h-[1px] w-full clear-both my-[24px] leading-[1.5px] bg-[#e8e8e8]" />
      {/* 表格 */}
      <Spin spinning={loading} delay={500}>
        {container}
      </Spin>
    </AgentCss>
  );
};
export default Agent;
