import axios from 'axios';

let baseURL;

if (process.env.REACT_APP_LOCAL) {
  baseURL = 'http://localhost:8090/api';
} else {
  baseURL = 'https://vardiety-back.herokuapp.com/api';
}

const api = axios.create({
  baseURL
});

export default api;
