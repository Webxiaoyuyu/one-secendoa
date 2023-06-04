import request from '@/service/request';
import { AxiosPromise } from 'axios';

type IAdminVerifycodeResponseData = {
  code: number;
  msg: string;
  data: { svg: string; no: string };
};

export const getAdminVerifycode = () =>
  <AxiosPromise<IAdminVerifycodeResponseData>>request.get('/admin/verifycode');
