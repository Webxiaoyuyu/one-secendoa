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

type IloginInResponseData = { code: number; msg: string; data: object };
// 获取验证码
export const getAdminVerifycode = () =>
  <AxiosPromise<IAdminVerifycodeResponseData>>request.get('/admin/verifycode');

// 登录
export const loginIn = (data: ILoginArgs) =>
  request.post('/admin/login', data) as AxiosPromise<IloginInResponseData>;
