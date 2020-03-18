import axios from 'axios';

const list = async () => axios.get(`${process.env.REACT_APP_BASE_URL}/api/list`).then((res) => res.data);

const get = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/list/${id}`);

const destroy = async (id) => axios.delete();

const update = async (data) => axios.put();

const create = async (data) => {
  console.log(data);
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/list`, data).then((res) => res.data);
};

export default {
  list,
  get,
  destroy,
  update,
  create,
};
