import axios from 'axios';

const loginUser = async (data) => axios.post(`/api/user/login`, data);

const logoutUser = async (id) => axios.post(id);

const registerUser = async (data) => axios.post(`/api/user/register`, data);

const edit = async (id) => axios.put(id);

const destroy = async (id) => axios.delete(id);

const findAll = async () => axios.get(`/api/user/all`).then((res) => res.data);

const findOne = async () => axios.get(`/api/user/`).then((res) => res.data);

export default {
  loginUser,
  logoutUser,
  registerUser,
  edit,
  destroy,
  findAll,
  findOne,
};
