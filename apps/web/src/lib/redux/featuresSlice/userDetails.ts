// store/sidebarSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {getUserDetails} from '../../../utils/api/getUserData';
import {userCredentials} from 'types'
interface UserState extends userCredentials{
 state?: 'pending' | 'loading' | 'succeeded' | 'failed';

}
const  initialState:UserState={
  username: '',
  userId: null,
  picture: '',
  email: '',
  token: "",
  isVerified:null,
  state: 'pending',
};

export const getUser_details = createAsyncThunk(
  'auth/getDetails',
  async (_, thunkAPI) => {
    try {
      const res = await getUserDetails();
      return res
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.picture = action.payload.picture;
      state.email = action.payload.email;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser_details.pending, (state) => {
        state.state ='loading';
      })
      .addCase(getUser_details.fulfilled, (state, action)=> {
      
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.picture = action.payload.picture;
        state.isVerified=action.payload.isVerified;
        state.token=action.payload.token;
        state.state = 'succeeded';
        }
      )
      .addCase(getUser_details.rejected, (state) => {
        state.state = 'failed';
      });
  },
});


export const userInfo = (state: RootState) => state.user;


export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
