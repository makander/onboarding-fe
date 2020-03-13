import axios from 'axios';

const list = async () => axios
  .get(`${process.env.REACT_APP_BASE_URL}/api/department/list`)
  .then((res) => res.data);

const get = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`).then((res) => res.data);

const destroy = async (id) => axios.delete(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`);

const update = async (id, data) => axios.put(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`, data).then((res) => res.data);

const create = async (data) => axios
  .post(`${process.env.REACT_APP_BASE_URL}/api/department`, data);

export default {
  list,
  get,
  destroy,
  update,
  create,
};
