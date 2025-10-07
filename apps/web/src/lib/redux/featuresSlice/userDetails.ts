// store/sidebarSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {getUserDetails} from '../../../utils/getUserData';
import {userCredentials} from 'types'

interface UserState extends userCredentials{
 state?: 'pending' | 'loading' | 'succeeded' | 'failed';

}

const  initialState: UserState = {
  username: '',
  userId: null,
  picture: '',
  emailId: '',
  token: "",
  isVerified:null,
  state: 'pending',
};

export const getUser_details = createAsyncThunk(
  'auth/getDetails',
  async (_, thunkAPI) => {
    try {
      const res = await getUserDetails();
      return res as UserState;
      return
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.picture = action.payload.picture;
      state.emailId = action.payload.emailId;

    },
    // You can add logout reducer if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser_details.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(getUser_details.fulfilled, (state, action)=> {
        if(action.payload){
        state.username = action.payload.username;
        state.emailId = action.payload.emailId;
        state.userId = action.payload.userId;
        state.picture = action.payload.picture;
        state.isVerified=action.payload.isVerified
        state.token=action.payload.token
        state.state = 'succeeded';
        }
      })
      .addCase(getUser_details.rejected, (state) => {
        state.state = 'failed';
      });
  },
});

// Selectors
export const userState = (state: RootState) => state.user;

// Actions
export const { setUserDetails } = userSlice.actions;

// Reducer
export default userSlice.reducer;
