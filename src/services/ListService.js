import axios from 'axios';

const all = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/list`)
    .then((res) => res.data);

const get = async (id) =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/list/${id}`)
    .then((res) => res.data);

const destroy = async (id) =>
  axios.delete(`${process.env.REACT_APP_BASE_URL}/api/list/${id}`);

const update = async (id, data) =>
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/api/list/${id}`, data)
    .then((res) => res.data);

const create = async (data) =>
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/list`, data)
    .then((res) => res.data);

export default {
  all,
  get,
  destroy,
  update,
  create,
};
