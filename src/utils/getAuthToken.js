import axios from 'axios';

//axios.defaults.baseURL = 'https://yyes-hoa-management-server.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:5000'

export const getOptions = () => { return {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  }}