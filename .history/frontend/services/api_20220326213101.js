import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.128.1:3333/api/users'
})

export default api;