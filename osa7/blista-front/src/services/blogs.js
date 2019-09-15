import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
  return axios.get(baseUrl);
};

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`;
};

const createBlog = ({ title, author, url }) => {
  const config = { headers: { Authorization: token } };
  return axios.post(baseUrl, { title, author, url }, config);
};

const likeAction = (id, likes) => {
  const config = { headers: { Authorization: token } };
  return axios.put(`${baseUrl}/${id}`, { likes }, config);
};

const comment = (id, comment) => {
  const config = { headers: { Authorization: token } };
  return axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
};

const remove = (id) => {
  const config = { headers: { Authorization: token } };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  createBlog,
  comment,
  getAll,
  setToken,
  likeAction,
  remove
};