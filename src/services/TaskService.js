import axios from 'axios';

const getTasks = async () => axios.get(`/api/list`);

const getAtask = async (userId, listId) => axios.get(`/api/list/${listId}`);

const deleteTask = async (id) => axios.delete();

const updateTask = async (taskId, data) =>
  axios.put(`/api/task/${taskId}`, data);

const createTask = async (data) => axios.post(`/api/task/`, data);

export default {
  getTasks,
  getAtask,
  deleteTask,
  updateTask,
  createTask,
};
