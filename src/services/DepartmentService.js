import axios from 'axios';


const fetchDepartments = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}/list`);

const fetchDepartment = async (id) => axios.get();

const deleteDepartment = async (id) => axios.delete();

const updateDepartment = async (data) => axios.put();

const createDepartment = async (data) => axios.post();

export default {
  fetchDepartments,
  fetchDepartment,
  deleteDepartment,
  updateDepartment,
  createDepartment,
};
