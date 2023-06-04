import axios from 'axios';

const request = axios.create({
  baseURL: 'http://192.168.121.66:8888',
});

export default request;
