import axios from 'axios';

axios.defaults.headers = {
  'Content-Type': 'application/json',
};


console.log(process.env.REACT_APP_BASE_URL);

const userLogin = async (data) => {
  const request = axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, { data });
  return request.then((res) => res.data);
};

export default {
  userLogin,
};
