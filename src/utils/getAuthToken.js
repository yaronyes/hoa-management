import axios from 'axios';
import config from '../config/config.json';

//axios.defaults.baseURL = 'https://yyes-hoa-management-server.herokuapp.com';
//axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = config.server_url;

export const getOptions = () => { return {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  }}