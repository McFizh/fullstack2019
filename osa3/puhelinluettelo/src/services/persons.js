import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api'
});

const getAll = () => {
  return axios.get('/persons')
    .then( response => response.data );
}

const create = person => {
  return axios.post('/persons', person)
    .then( response => response.data );
}

const update = person => {
  return axios.put(`/persons/${person.id}`, person)
  .then( response => response.data );
}

const deletePerson = person => {
  return axios.delete(`/persons/${person.id}`)
  .then( response => response.data );
}

export default {
  getAll,
  create,
  update,
  deletePerson,
}
