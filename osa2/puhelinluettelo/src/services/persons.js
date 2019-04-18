import Axios from 'axios';

const getAll = () => {
  return Axios.get("http://localhost:3001/persons")
    .then( response => response.data );
}

const create = person => {
  return Axios.post("http://localhost:3001/persons", person)
    .then( response => response.data );
}

export default {
  getAll,
  create,
}