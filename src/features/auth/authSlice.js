import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';
// import { updateUser } from '../user/userAPI';


const initialState = {
  loggedInUserToken: null, 
  status: 'idle',
  error: null
};

export const selectAuth = (state) => state.counter; // Assuming counter is your authentication slice


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);

    return response.data;
  }
);

// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);

//     return response.data;
//   }
// );

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, {rejectWithValue}) => {
    try{
      const response = await checkUser(loginInfo);
      return response.data;
    }catch(error){
       console.log(error);
       return rejectWithValue(error);
    }

  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);

    return response.data;
  }
);

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,

//   reducers: {
//     increment: (state) => {

//       state.value += 1;
//     },

//   },
export const authSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    // increment: (state) => {

    //   state.value += 1;
    // },

  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUserToken = action.payload;
      // })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      });
  },
});

// export const { increment } = counterSlice.actions;
export const { increment } = authSlice.actions;

export const selectCount = (state) => state.counter.value;

export const selectLoggedInUser = (state) =>state.auth.loggedInUserToken;  // old:selectloggedInUser
export const selectError = (state) =>state.auth.error;

// export default counterSlice.reducer;
export default authSlice.reducer;
