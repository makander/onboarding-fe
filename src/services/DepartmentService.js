import axios from 'axios';

const all = async () =>
  axios.get(`/api/department/all`).then((res) => res.data);

const allLists = async () =>
  axios.get(`/api/department/lists`).then((res) => res.data);

const allTasks = async () =>
  axios.get(`/api/department/tasks`).then((res) => res.data);

const get = async (id) =>
  axios.get(`/api/department/${id}`).then((res) => res.data);

const destroy = async (id) => axios.delete(`/api/department/${id}`);

const update = async (id, data) =>
  axios.put(`/api/department/${id}`, data).then((res) => res.data);

const removeUser = async (id, data) =>
  axios
    .delete(`/api/department/${id}/user`, {
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
const create = async (data) => axios.post(`/api/department`, data);

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
