import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { urlsData } from "types";
import { getUrls } from "../../../utils/api/getUrls";

const initialState: urlsData = {
  totalStats: [
    {
      _id: null,
      totalClicks: 0,
      longUrl: "",
    },
  ],
  state: "loading",
};

export const getUrlsData = createAsyncThunk(
  "getUrlData",
  async (_, thunkAPI) => {
    try {
      const res = await getUrls();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "urlsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUrlsData.pending, (state) => {
        state.state = "loading";
      })
      .addCase(getUrlsData.fulfilled, (state, action) => {
        state.totalStats = action.payload.totalStats;
        state.state = "succeded";
      })
      .addCase(getUrlsData.rejected, (state) => {
        state.state = "failed";
      });
  },
});

// Export the action
export const urlsState = (state: RootState) => state.urlsData;
// Export the reducer

export default analyticsSlice.reducer;
