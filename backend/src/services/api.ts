import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/users',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  },
})

export default api;