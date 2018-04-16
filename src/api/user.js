import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 5000 // request timeout
});

export const getUserMenuList = params => {
  return service.post('/usercenter/getMenuList', params).then(res => res.data);
};

export const getUserSchoolList = params => {
  return service.post('/usercenter/getSchoolList', params).then(res => res.data);
};

export default {
  getUserMenuList,
  getUserSchoolList
};
