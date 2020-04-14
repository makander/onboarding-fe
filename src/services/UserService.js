import axios from 'axios';

const loginUser = async (data) => axios.post(`/api/user/login`, data);

const logoutUser = async () => axios.post(`/api/user/logout`);

const registerUser = async (data) => axios.post(`/api/user/register`, data);

const edit = async (id, data) => axios.put(`/api/user/${id}`, data);

const destroy = async (id) => axios.delete(`/api/user/${id}`);

const findAll = async () => axios.get(`/api/user/`).then((res) => res.data);

const findOne = async (id) =>
  axios.get(`/api/user/${id}`).then((res) => res.data);

const refresh = async () => axios.post(`/api/user/refresh`);

export default {
  loginUser,
  logoutUser,
  registerUser,
  edit,
  destroy,
  findAll,
  findOne,
  refresh,
};
