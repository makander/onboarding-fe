import axios from 'axios';


const fetchLists = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/:id/list`, id);

const fetchAList = async (id) => axios.get();

const deleteList = async (id) => axios.delete();

const updateList = async (data) => axios.put();

const createList = async (data) => axios.post();


export default {
  deleteList,
  fetchAList,
  fetchLists,
  updateList,
  createList,
};
