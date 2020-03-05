import axios from 'axios';

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

const loginUser = async (data) => axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, data);

// const logoutUser;

// const registerUser;

export default {
  loginUser,
};
