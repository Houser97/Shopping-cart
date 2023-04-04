import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = 'http://localhost:5000/api';

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {

    const response = await fetch(`${API}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();

    if (Array.isArray(user)) {
      return thunkAPI.rejectWithValue(user);
    }

    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    validationErrors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        console.log('is loading')
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.validationErrors = [];
        console.log(state.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.validationErrors = action.payload;
        console.log('rejected')
      });
  },
});

export const selectUser = (state) => state.user;
export const selectUserLoading = (state) => state.isLoading;
export const selectUserValidationErrors = (state) => state.validationErrors;

export default userSlice.reducer;