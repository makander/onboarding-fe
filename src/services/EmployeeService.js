import axios from 'axios';

const all = async () => axios.get(`/api/employee/all`).then((res) => res.data);

const get = async (id) =>
  axios.get(`/api/employee/${id}`).then((res) => res.data);

const destroy = async (id) => axios.delete(`/api/employee/${id}`);

const update = async (id, data) =>
  axios.put(`/api/employee/${id}`, data).then((res) => res.data);

const create = async (data) => axios.post(`/api/employee`, data);

export default {
  all,
  get,
  destroy,
  update,
  create,
};
