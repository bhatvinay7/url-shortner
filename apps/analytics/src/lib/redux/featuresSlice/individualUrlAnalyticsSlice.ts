import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { individualUrlAnalyticsData } from "types";
import { getUrlAnalytics } from "../../../utils/api/urlAnalytics";

const initialState: individualUrlAnalyticsData = {
  deviceType: [{ 
    uniqueClicks: 0,
    deviceName: null,
    uniqueUsers: 0
  }],

  last7Days: [{
    dailyClicks: 0,
    date: "",
  }],
  osType: [{
    uniqueClicks: 0,
    osType: null,
    uniqueUsers: 0
  }],

  totalStats: {
    totalClicks: 0,
    uniqueUsers: 0
  },
  state:"loading"
};


export const UrlAnalytics = createAsyncThunk(
  "getAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await getUrlAnalytics("");
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "individualUrlAnalyticsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UrlAnalytics.pending, (state) => {
        state.state = "loading";
      })
      .addCase(UrlAnalytics.fulfilled, (state, action) => {
        state.deviceType = action.payload.deviceType
        state.last7Days= action.payload.last7Days
        state.osType=action.payload.osType
        state.totalStats=action.payload.totalStats
        state.state="succeeded"
      })
      .addCase(UrlAnalytics.rejected, (state) => {
        state.state = "failed";
      });
  },
});

// Export the action
export const individualUrlAnalyticState= (state: RootState) => state.individualUrlAnalyticsData
// Export the reducer

export default analyticsSlice.reducer;
