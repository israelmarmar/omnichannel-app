import axios from 'axios';

const api = axios.create({
  baseURL: 'http://omnichannel-app-back.herokuapp.com/api/users'
})

export default api;