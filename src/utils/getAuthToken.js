import axios from 'axios';

axios.defaults.baseURL = 'https://yyes-hoa-management-server.herokuapp.com';

export const getOptions = () => { return {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  }}