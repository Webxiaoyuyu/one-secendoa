/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RouterConfig from '@/router';
import Auth from '@/auth/Auth';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Avatar, Space } from 'antd';
import logo from '@/assets/logo.svg';

const { Header, Content, Sider } = Layout;
const menuName = [
  '数据总览',
  '用户管理',
  '订单管理',
  '骑手管理',
  '城市管理',
  '运营管理',
  '优惠券管理',
  '提现管理',
  '系统设置',
];
const options = [
  [],
  ['代理管理', ' 管理员列表', ' 用户列表 '],
  [' 订单列表 ', ' 资金走向列表 ', ' 取消订单配置 ', '小费选项配置 '],
  [' 骑手列表 ', ' 骑手审核列表 '],
  [' 运营城市列表 '],
  [' 计价规则 ', ' 重量标签 ', ' 物品标签组 '],
  [' 优惠券列表 ', ' 优惠券设置 '],
  [' 提现列表 ', ' 提现设置 '],
  [
    ' 小程序设置 ',
    ' 分享设置 ',
    ' 积分设置 ',
    ' 订阅消息设置 ',
    ' 用户指南 ',
    ' 骑手指南 ',
    ' 骑手协议 ',
  ],
];

const routerUrl = [
  { rou: 'home', children: [] },
  { rou: 'user', children: ['agent/agents', 'admins', 'users'] },
  { rou: 'order', children: ['orders', 'capitaltrend', 'cancelset', 'feeset'] },
  { rou: 'rider', children: ['riders', 'registers'] },
  { rou: 'city', children: ['citys'] },
  { rou: 'city', children: ['valuation/valuations', 'weight/weight', 'tag/tag'] },
  { rou: 'coupon', children: ['coupons', 'setting'] },
  { rou: 'rider', children: ['cash', 'setting'] },
  {
    rou: 'config',
    children: ['app', 'share', 'integral', 'wxsubscribe', 'user', 'rider', 'agreementRider'],
  },
];

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => ({
  key: `${index}`,
  icon: React.createElement(icon),
  label: menuName[index],

  children:
    options[index].length === 0
      ? null
      : options[index].map((itm, keys) => ({
          key: `${index}-${keys}`,
          label: itm,
        })),
}));

export default function LayOut(): JSX.Element {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e: any) => {
    const MaxKey = Number(e.key.charAt(0));
    const MinKey = e.key.charAt(2) === '' ? null : Number(e.key.charAt(2));
    if (MinKey === null) {
      navigate(`/${routerUrl[MaxKey].rou}`);
    } else {
      navigate(`/${routerUrl[MaxKey].rou}/${routerUrl[MaxKey].children[MinKey]}`);
    }
  };
  return (
    <div>
      <Layout className=" w-full h-[100vh]">
        <Header
          style={{ display: 'flex', alignItems: 'center' }}
          className="!bg-[#fff] !h-[60px] !px-[20px]"
        >
          <div className=" w-full flex justify-between items-center">
            <div className=" flex items-center">
              <img className=" overflow-hidden h-[30px]" src={logo} alt="" />
              <span className=" text-[20px] ml-[12px] font-bold">一秒快送后台管理系统</span>
            </div>
            <div>
              <Space wrap size={16}>
                <Avatar size={32} icon={<UserOutlined />} />
              </Space>
            </div>
          </div>
        </Header>
        <Layout className="p-[20px]">
          <Sider
            width={200}
            style={{ background: colorBgContainer }}
            className=" overflow-hidden overflow-y-auto"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['0']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
              onClick={onClick}
            />
          </Sider>
          <Layout style={{ paddingLeft: '20px' }}>
            <Content
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Auth>
                <RouterConfig />
              </Auth>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
