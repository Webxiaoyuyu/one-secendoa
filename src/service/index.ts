import request from '@/service/request';

export const getInfo = async () => {
  const res = await request.get('/admin/verifycode');
  return res.data.sub;
};
