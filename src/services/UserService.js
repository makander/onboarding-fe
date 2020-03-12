import axios from 'axios';

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

const loginUser = async (data) => axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, data);

const logoutUser = async (id) => axios.post(id);

const registerUser = async (data) => axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/register`, data);

const editUser = async (id) => axios.put(id);

const deleteUser = async (id) => axios.delete(id);

const listUsers = async () => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/list`).then((res) => res.data);


const getUser = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`);

export default {
  loginUser,
  logoutUser,
  registerUser,
  editUser,
  deleteUser,
  listUsers,
  getUser,
};
