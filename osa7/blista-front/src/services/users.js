import axios from 'axios';
const baseUrl = '/api/users';

const getAll = () => {
  return axios.get(baseUrl);
};

export default {
  getAll
};