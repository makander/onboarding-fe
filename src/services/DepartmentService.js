import axios from 'axios';

const all = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/all`)
    .then((res) => res.data);

const get = async (id) =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`)
    .then((res) => res.data);

const destroy = async (id) =>
  axios.delete(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`);

const update = async (id, data) =>
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/api/department/${id}`, data)
    .then((res) => res.data);

const removeUser = async (id, data) =>
  axios
    .delete(`${process.env.REACT_APP_BASE_URL}/api/department/${id}/user`, {
      data,
    })
    .then((res) => res.data);

const findAllDepartmentTasks = async (id) =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/${id}/tasks`)
    .then((res) => res.data);

const findAllDepartmentLists = async (id) =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/${id}/list`)
    .then((res) => res.data);

const create = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/department`, data);

export default {
  all,
  get,
  destroy,
  update,
  create,
  removeUser,
  findAllDepartmentTasks,
  findAllDepartmentLists,
};
