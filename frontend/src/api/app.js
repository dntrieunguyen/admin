import axios from '../axios.js';

export const apiGetAllUsers = () =>
   axios({
      url: '/user/',
      method: 'GET',
   });
export const apiUploadAvatar = data =>
   axios({
      url: '/auth/upload-avatar',
      method: 'POST',
      data: data,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
export const apiUpDateUser = data =>
   axios({
      url: `/user/?id=${data._id}`,
      method: 'PUT',
      data: data,
   });
export const apiBlockUser = data =>
   axios({
      url: '/user/toggle-active',
      method: 'POST',
      data: data,
   });
export const apiCreateUser = data =>
   axios({
      url: '/user/create-user',
      method: 'POST',
      data: data,
   });
export const apiCreateQuestion = data =>
   axios({
      url: '/question/create-question',
      method: 'POST',
      data: data,
   });
export const apiGetQuestions = data =>
   axios({
      url: '/question/',
      method: 'GET',
   });
export const apiUpdateQuestions = data =>
   axios({
      url: `/question/?id=${data.id}`,
      method: 'PUT',
      data: data,
   });

export const apiDeletedQuestions = id =>
   axios({
      url: `/question/?id=${id}`,
      method: 'DELETE',
   });
