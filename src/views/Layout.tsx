/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RouterConfig from '@/router';
import Auth from '@/auth/Auth';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Avatar, Space } from 'antd';
import logo from '@/assets/logo.svg';
import { getAdminInfo } from '@/service/index';
import styled from 'styled-components';

function removeCookie(cname: string) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  let cookieStr = '';
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      document.cookie = `${c};expires=${new Date(0).toUTCString()}`;
    } else {
      cookieStr += c;
      cookieStr += ';';
    }
    document.cookie = cookieStr;
  }
}

export const LayoutCss = styled.div`
  .ant-popover-inner {
    padding: 0 !important;
    background: red !important;
  }
`;

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
  const [isShow, setIsShow] = useState(false);
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
  const [loginInfo, setloginInfo] =
    useState<Awaited<ReturnType<typeof getAdminInfo>>['data']['data']>();
  // 获取登录个人信息
  useEffect(() => {
    getAdminInfo().then((res) => {
      setloginInfo(res.data.data);
    });
  }, []);

  // 点击个人设置
  const orderSetting = () => {
    // 跳转到个人设置
    navigate('/user/update');
  };

  // 点击修改密码
  const editPwd = () => {
    // 跳转到修改密码
    navigate('/user/pwd');
  };

  // 退出登录
  const loginOut = () => {
    removeCookie('token');
    navigate('/login');
  };
  return (
    <LayoutCss>
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
            <div
              className=" relative"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {loginInfo?.avatarUrl === null ? (
                <Space wrap size={16} className="">
                  <Avatar size={32} icon={<UserOutlined />} />
                </Space>
              ) : (
                <img className="w-[32px] rounded-full" src={loginInfo?.avatarUrl} alt="" />
              )}
              {isShow ? (
                <div className=" w-[240px] absolute top-[60px] right-0 rounded-[12px] z-[999] shadow-md">
                  <div className=" px-[20px] bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb]">
                    <div className=" flex w-full h-[26px] text-[#fff] text-[22px]">
                      <span>{loginInfo?.realName}</span>
                      <span className=" ml-[12px]">{loginInfo?.mobileNumber}</span>
                    </div>
                    <div className=" text-[#fff]">NO:{loginInfo?.adminNo}</div>
                  </div>
                  <div className="">
                    <div
                      className="px-[20px] h-[50px] leading-[50px] hover:bg-[#f4eeee]"
                      onClick={orderSetting}
                    >
                      个人设置
                    </div>
                    <div
                      className="px-[20px] h-[50px] leading-[50px] hover:bg-[#f4eeee]"
                      onClick={editPwd}
                    >
                      修改密码
                    </div>
                  </div>
                  <div className=" border-t border-solid border-[#eee]">
                    <div className="px-[20px] hover:bg-[#f4eeee]" onClick={loginOut}>
                      退出登录
                    </div>
                  </div>
                </div>
              ) : null}
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
              className=" overflow-hidden overflow-y-auto"
            >
              <Auth>
                <RouterConfig />
              </Auth>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LayoutCss>
  );
}
