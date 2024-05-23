import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetAllUsers, apiGetQuestions } from '../../api/app';

export const getAllUser = createAsyncThunk('user', async () => {
   try {
      const response = await apiGetAllUsers();
      return response;
   } catch (error) {
      console.log(error);
   }
});

export const getAllQuestions = createAsyncThunk('question', async () => {
   try {
      const response = await apiGetQuestions();
      return response;
   } catch (error) {
      console.log(error);
   }
});
