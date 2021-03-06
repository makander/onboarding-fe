import axios from 'axios';

const all = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/`)
    .then((res) => res.data);

const allLists = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/lists`)
    .then((res) => res.data);

const allTasks = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/department/tasks`)
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

/* const findAllDepartmentTasks = async () =>
  axios
    .get(`/api/department/tasks`)
    .then((res) => res.data);

const findAllDepartmentLists = async () =>
  axios
    .get(`/api/department/lists`)
    .then((res) => console.log(res));
 */
const create = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/department`, data);

export default {
  all,
  get,
  destroy,
  update,
  create,
  removeUser,
  /*   findAllDepartmentTasks,
  findAllDepartmentLists, */
  allLists,
  allTasks,
};
