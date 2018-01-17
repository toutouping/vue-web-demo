import axios from 'axios';

let base = '/api';

// 1.获取成熟度字典
export const getMenuList = params => {
  return axios.post(`${base}/getMenuList`, params).then(res => res.data);
};

let api = {
  getMenuList: getMenuList
};

export default api;
