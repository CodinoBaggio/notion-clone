import axiosClient from './axiosClient';

const authApi = {
  register: (params: any) => axiosClient.post('/register', params),
};

export default authApi;
