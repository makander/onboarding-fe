import axios from 'axios';

const all = async () => axios.get(`/api/list`).then((res) => res.data);

const get = async (id) => axios.get(`/api/list/${id}`).then((res) => res.data);

const destroy = async (id) => axios.delete(`/api/list/${id}`);

const update = async (id, data) =>
  axios.put(`/api/list/${id}`, data).then((res) => res.data);

const create = async (data) =>
  axios.post(`/api/list`, data).then((res) => res.data);

export default {
  all,
  get,
  destroy,
  update,
  create,
};
