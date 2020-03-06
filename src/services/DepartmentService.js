import axios from 'axios';


const fetchDepartments = async () => axios.get(`${process.env.REACT_APP_BASE_URL}/api/departments/list`);

const fetchDepartment = async (id) => axios.get(`${process.env.REACT_APP_BASE_URL}/api/departments/${id}`);

const deleteDepartment = async (id) => axios.delete();

const updateDepartment = async (data) => axios.put();

const createDepartment = async (data) => axios.post(`${process.env.REACT_APP_BASE_URL}/api/departments/list`, data);

export default {
  fetchDepartments,
  fetchDepartment,
  deleteDepartment,
  updateDepartment,
  createDepartment,
};
