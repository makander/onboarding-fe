import axios from 'axios';

const getTasks = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}/list`);

const getAtask = async (userId, listId) => axios.get(
  `${process.env.REACT_APP_BASE_URL}/api/user/${userId}/list/${listId}/`,
);

const deleteTask = async (id) => axios.delete();

const updateTask = async (userId, listId, taskId, data) => axios.put(
  `${process.env.REACT_APP_BASE_URL}/api/user/${userId}/list/${listId}/${taskId}`,
  data,
);

const createTask = async (data) => axios.post(
  `${process.env.REACT_APP_BASE_URL}/api/task/`,
  data,
);


export default {
  getTasks,
  getAtask,
  deleteTask,
  updateTask,
  createTask,
};
