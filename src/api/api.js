import axios from 'axios';

let base = '/api';

export const getMenuList = params => {
  return axios.post(`${base}/getMenuList`, params).then(res => res.data);
};

export const getSchoolList = params => {
  return axios.post(`${base}/getSchoolList`, params).then(res => res.data);
};

let api = {
  getMenuList,
  getSchoolList
};

export default api;
