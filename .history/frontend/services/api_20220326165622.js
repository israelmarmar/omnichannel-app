import axios from 'axios';

const api = axios.create({
  baseURL: 'https://omnichannel-app-back.herokuapp.com/api/users'
})

export default api;