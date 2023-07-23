import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['authorization'] = `Bearer ${getToken()}`;
  return config;
  // return {
  //   ...config,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${getToken()}`,
  //   },
  // };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
