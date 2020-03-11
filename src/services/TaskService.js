import axios from 'axios';

const getTasks = async () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/list`);

const getAtask = async (userId, listId) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/list/${listId}`);

const deleteTask = async (id) => axios.delete();

const updateTask = async (taskId, data) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/api/task/${taskId}`, data);

const createTask = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/task/`, data);

export default {
  getTasks,
  getAtask,
  deleteTask,
  updateTask,
  createTask,
};
