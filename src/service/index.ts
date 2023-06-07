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
