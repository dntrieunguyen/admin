import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { saveToLocalStorage } from '../../utils/helper';
import { apiLogOut, apiLogin } from '../../api/auth';

export const login = createAsyncThunk('auth/login', async userData => {
   const response = await apiLogin(userData);

   response?.success
      ? Swal.fire('Success', response?.message, 'success')
      : Swal.fire('Oop!', response?.message, 'error');
   if (response?.success) {
      const current_user = {
         access_token: response?.access_token,
         userData: response?.results,
         isLoggedIn: true,
      };
      saveToLocalStorage('current_user', current_user);
   }

   return response;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
   const response = await apiLogOut();

   if (response.success) {
      Swal.fire('Success', response?.message, 'success');
   }
   return response;
});

// export const register = createAsyncThunk('/auth/register', async data => {
//    const response = await apiRegister(data);
//    response?.success
//       ? Swal.fire('Success', response?.message, 'success')
//       : Swal.fire('Oop!', response?.message, 'error');
//    return response;
// });
