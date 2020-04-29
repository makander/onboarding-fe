import axios from 'axios';

const findAllEmail = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/notification/email`)
    .then((res) => res.data);

const updateEmail = async (id, data) =>
  axios.put(
    `${process.env.REACT_APP_BASE_URL}/api/notification/email/${id}`,
    data
  );

const updateSlack = async (id) =>
  axios.put(`${process.env.REACT_APP_BASE_URL}/api/notification/slack/${id}`);

const findAllSlack = async () =>
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/notification/slack`)
    .then((res) => res.data);

const destroyEmail = async (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/notification/email/${id}`
  );

const destroySlack = async (id) =>
  axios.delete(
    `${process.env.REACT_APP_BASE_URL}/api/notification/slack/${id}`
  );

const createMail = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/notification/email`, data);

const createSlack = async (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/notification/slack`, data);

export default {
  findAllEmail,
  findAllSlack,
  destroySlack,
  destroyEmail,
  updateEmail,
  updateSlack,
  createMail,
  createSlack,
};
