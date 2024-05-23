import { createSlice } from '@reduxjs/toolkit';
import { logOut, login } from './auth.thunk.js';
import { getFromLocalStorage } from '../../utils/helper.js';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userData: getFromLocalStorage('current_user')?.userData,
      isLoggedIn: getFromLocalStorage('current_user')?.isLoggedIn || false,
      loading: false,
      error: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            if (action?.payload?.success) {
               state.userData = action?.payload?.results;
               state.isLoggedIn = true;
            }
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false;

            // state.error = action.error.message;
         })

         //  LogOut
         .addCase(logOut.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(logOut.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = null;
            state.isLoggedIn = false;
            localStorage.removeItem('current_user');
         })
         .addCase(logOut.rejected, (state, action) => {
            state.loading = false;

            // state.error = action.error.message;
         });

      //      //  register
      //      .addCase(register.pending, (state, action) => {
      //         state.loading = true;
      //         state.error = null;
      //      })
      //      .addCase(register.fulfilled, (state, action) => {
      //         state.loading = false;
      //         state.data = null;
      //         state.isLoggedIn = false;
      //      })
      //      .addCase(register.rejected, (state, action) => {
      //         state.loading = false;

      //         // state.error = action.error.message;
      //      });
   },
});

export default authSlice;
