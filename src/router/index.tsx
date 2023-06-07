/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from '@/views/Home';
import Login from '@/views/Login';
// import UAgent from '@/views/user/Agent';
import UAdmins from '@/views/user/Admins';
import UUsers from '@/views/user/Users';

// import OOrders from '@/views/order/OrderList';
import OCapitaltrend from '@/views/order/Capitaltrend';
import OCancelset from '@/views/order/Cancelset';
import OFeeset from '@/views/order/Feeset';

// import RRiderList from '@/views/rider/RiderList';
import RRegisters from '@/views/rider/Registers';

import CCitys from '@/views/city/Citys';

// import OPricing from '@/views/operation/Pricing';
import OWeight from '@/views/operation/Weight';
import OTag from '@/views/operation/Tag';

import CCoupons from '@/views/coupon/Coupons';
import CSetting from '@/views/coupon/Setting';

import RCash from '@/views/rider/Cash';
import RSetting from '@/views/rider/Setting';

import CApp from '@/views/config/App';
import CShare from '@/views/config/Share';
import CIntegral from '@/views/config/Integral';
import CWxsubscribe from '@/views/config/Wxsubscribe';
import CUser from '@/views/config/User';
import CRider from '@/views/config/Rider';
import CAgreementRider from '@/views/config/AgreementRider';

import UUpdate from '@/views/user/Update';
import UPwd from '@/views/user/Pwd';

export default function RoutesConfig() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    // 用户管理user
    // {
    //   path: '/user/agent/agents',
    //   element: <UAgent />,
    // },
    {
      path: '/user/admins',
      element: <UAdmins />,
    },
    {
      path: '/user/users',
      element: <UUsers />,
    },

    // 订单管理order
    // {
    //   path: '/order/orders',
    //   element: <OOrders />,
    // },
    {
      path: '/order/capitaltrend',
      element: <OCapitaltrend />,
    },
    {
      path: '/order/cancelset',
      element: <OCancelset />,
    },
    {
      path: '/order/feeset',
      element: <OFeeset />,
    },

    // 骑手管理rider
    // {
    //   path: '/rider/riders',
    //   element: <RRiderList />,
    // },
    {
      path: '/rider/registers',
      element: <RRegisters />,
    },

    // 城市管理city
    {
      path: '/city/citys',
      element: <CCitys />,
    },

    // 运营管理operation
    // {
    //   path: '/city/valuation/valuations',
    //   element: <OPricing />,
    // },
    {
      path: '/city/weight/weight',
      element: <OWeight />,
    },
    {
      path: '/city/tag/tag',
      element: <OTag />,
    },

    // 优惠券管理coupon
    {
      path: '/coupon/coupons',
      element: <CCoupons />,
    },
    {
      path: '/coupon/setting',
      element: <CSetting />,
    },

    // 提现管理rider
    {
      path: '/rider/cash',
      element: <RCash />,
    },
    {
      path: '/rider/setting',
      element: <RSetting />,
    },

    // 系统设置config
    {
      path: '/config/app',
      element: <CApp />,
    },
    {
      path: '/config/share',
      element: <CShare />,
    },
    {
      path: '/config/integral',
      element: <CIntegral />,
    },
    {
      path: '/config/wxsubscribe',
      element: <CWxsubscribe />,
    },
    {
      path: '/config/user',
      element: <CUser />,
    },
    {
      path: '/config/rider',
      element: <CRider />,
    },
    {
      path: '/config/agreementRider',
      element: <CAgreementRider />,
    },

    // 个人设置
    {
      path: '/user/update',
      element: <UUpdate />,
    },
    {
      path: '/user/pwd',
      element: <UPwd />,
    },
  ]);
}
