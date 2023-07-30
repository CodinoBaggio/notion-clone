import axiosClient from './axiosClient';

const memoApi = {
  create: () => axiosClient.post('/memo'),
  getAll: () => axiosClient.get('/memo'),
  getOne: (id: any) => axiosClient.get(`/memo/${id}`),
  update: (id: string, params: any) => axiosClient.put(`/memo/${id}`, params),
  delete: (id: string) => axiosClient.delete(`/memo/${id}`),
};

export default memoApi;
