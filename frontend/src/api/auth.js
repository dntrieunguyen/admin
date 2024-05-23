import axios from '../axios.js';

export const apiLogin = data =>
   axios({
      url: '/auth/login',
      data,
      method: 'POST',
   });

export const apiLogOut = () =>
   axios({
      url: '/auth/logout',
      method: 'POST',
   });

export const apiRegister = data =>
   axios({
      url: '/auth/register',
      method: 'POST',
      data,
   });
