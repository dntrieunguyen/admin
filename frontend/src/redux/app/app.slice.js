import { createSlice } from '@reduxjs/toolkit';
import { getAllQuestions, getAllUser } from './app.thunk';

const authSlice = createSlice({
   name: 'app',
   initialState: {
      data: {
         user: null,
         question: null,
      },
      loading: false,
      error: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getAllUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action?.payload?.success) {
               state.data.user = action?.payload?.results;
            }
         })
         .addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
         })
         .addCase(getAllQuestions.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getAllQuestions.fulfilled, (state, action) => {
            state.loading = false;
            if (action?.payload?.success) {
               state.data.question = action?.payload?.results;
            }
         })
         .addCase(getAllQuestions.rejected, (state, action) => {
            state.loading = false;
         });
   },
});

export default authSlice;
