import axios from 'axios';

const loginUser = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, data);

const logoutUser = async () =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/logout`);

const registerUser = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/register`, data);

const edit = async (id, data) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, data);

const destroy = async (id) =>
  axios.delete(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`);

const findAll = () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/user/`)
    .then((res) => res.data);

const findOne = async (id) =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`)
    .then((res) => res.data);

const refresh = async () =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/refresh`);

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
