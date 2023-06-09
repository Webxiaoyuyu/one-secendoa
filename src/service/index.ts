import request from '@/service/request';
import { AxiosPromise } from 'axios';

type IAdminVerifycodeResponseData = {
  code: number;
  msg: string;
  data: { svg: string; no: string };
};

interface ILoginArgs {
  adminName: string;
  adminPwd: string;
  no: string;
  verifyCode: string;
}

type TAdminInfoResponseData = {
  code: number;
  msg: string;
  data: {
    adminNo: string;
    mobileNumber: string;
    adminName: string;
    realName: string;
    avatarUrl: string | null;
  };
};

interface IEditInfo {
  avatarUrl: string | null;
  mobileNumber: string;
  realName: string;
}

interface Iupdatepwd {
  adminPwd: string;
  confirmPwd: string;
  oldpwd: string;
}

type TUpdatepwdResponseData = { code: number; msg: string };
type TEditInfoResponseData = { code: number; msg: string; data: object };
type TAdminSuperResponseData = { code: number; msg: string; data: boolean };
type IloginInResponseData = { code: number; msg: string; data: object };
// 获取验证码
export const getAdminVerifycode = () =>
  <AxiosPromise<IAdminVerifycodeResponseData>>request.get('/admin/verifycode');

// 登录
export const loginIn = (data: ILoginArgs) =>
  request.post('/admin/login', data) as AxiosPromise<IloginInResponseData>;

// 获取登录个人信息
export const getAdminInfo = () => <AxiosPromise<TAdminInfoResponseData>>request.get('/admin/info');

export const getAdminInfoSelf = () =>
  <AxiosPromise<TAdminInfoResponseData>>request.get('/admin/info/self');

// 修改个人信息
export const editAdminInfoSelf = (data: IEditInfo) =>
  request.put('/admin/update/self', data) as AxiosPromise<TEditInfoResponseData>;

// 退出登录
export const getAdminSuper = () =>
  <AxiosPromise<TAdminSuperResponseData>>request.get('/admin/super');

// 修改密码
export const editAdminUpdatepwd = (data: Iupdatepwd) =>
  request.put('/admin/updatepwd', data) as AxiosPromise<TUpdatepwdResponseData>;

// 代理列表
interface GetAgentListParams {
  current: number;
  pageSize: number;
  agentAccount?: string;
  agentNo?: string;
  mobileNumber?: string;
  realName?: string;
  status?: number;
}

type IsAgentList = {
  code: number;
  msg: string;
  data: {
    pageSize: number;
    current: number;
    count: number;
    totalPages: number;
    data: {
      agentNo: string;
      agentAccount: string;
      mobileNumber: string;
      realName: string;
      status: number;
      createTime: string;
      updateTime: string;
      defaultPwd: string;
      updatedBy: string;
    }[];
  };
};

export const getAgentList = async (params: GetAgentListParams) => {
  const res = request.get('/admin/agent/list', { params }) as AxiosPromise<IsAgentList>;
  return (await res).data.data;
};

// 改变状态
interface GetStatusParams {
  agentNo: string;
  status: number;
}
export const getStatus = async (params: GetStatusParams) => {
  const res = request.put('/admin/agent/status', params);
  return (await res).data;
};

// 添加代理
interface GetAdd {
  agentAccount: string;
  realName: string;
  mobileNumber: string;
  status: number;
}
export const getAdd = async (params: GetAdd) => {
  const res = request.post('/admin/agent/add', params);
  return (await res).data;
};

// 重置密码
interface GetPwd {
  agentNo: string;
}
export const getChangePwd = async (params: GetPwd) => {
  const res = request.put('/admin/agent/resetpwd', params);
  return (await res).data;
};

// 点击跳转到详情页面
interface GetList {
  adminNo?: string | null;
  pageSize: number;
  current: number;
  agentAccount?: string;
  agentNo?: string;
  mobileNumber?: string;
  realName?: string;
  status?: number;
}
export const getList = async (params: GetList) => {
  const res = request.get('/admin/list', { params });
  return (await res).data;
};

// 详情页面的切换状态
interface GetAdminStatusParams {
  adminNo: string | null;
  status: number;
}
export const getAdminStatus = async (params: GetAdminStatusParams) => {
  const res = request.put('/admin/status', params);
  return (await res).data;
};

// 详情页面重置密码
interface GetAdminPwd {
  adminNo: string | null;
}
export const getChangeAdminPwd = async (params: GetAdminPwd) => {
  const res = request.put('/admin/resetpwd', params);
  return (await res).data;
};

// 添加管理员
interface GetAdminAdd {
  adminName: string;
  realName: string;
  mobileNumber: string;
}
export const getAdminAdd = async (params: GetAdminAdd) => {
  const res = request.post('/admin/add', params);
  return (await res).data;
};
