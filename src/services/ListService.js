import axios from 'axios';


const fetchLists = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}/list`);

const fetchAList = async (id) => axios.get();

const deleteList = async (id) => axios.delete();

const updateList = async (data) => axios.put();

const createList = async (id, data) => {
  console.log(id, data);
  return axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/${id}/list`, data);
};


export default {
  deleteList,
  fetchAList,
  fetchLists,
  updateList,
  createList,
};
