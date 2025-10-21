import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { overallAnalyticsData } from "types";
import { getOverallAnalytics } from "../../../utils/api/overallAnalytics";


const initialState: overallAnalyticsData = {
     deviceType: [
    {
      uniqueClicks: 0,
      deviceName: null,
      uniqueUsers: 0,
    },
  ],
  osType: [
    {
      uniqueClicks: 0,
      osType: null,
      uniqueUsers: 0
    },
  ],
  totalStats: [{
    totalClicks: 0,
    totalUrls: 0,
    uniqueUsers: 0,
  }],
  state:"loading"
};



export const OverallAnalytics = createAsyncThunk(
  "getOverallAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await getOverallAnalytics();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "overallAnalyticsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OverallAnalytics.pending, (state) => {
        state.state = "loading";
      })
      .addCase(OverallAnalytics.fulfilled, (state, action) => {
       state.deviceType=action.payload.deviceType
       state.osType=action.payload.osType
       state.totalStats=action.payload.totalStats
       state.state="succeeded"
      }) 
      .addCase(OverallAnalytics.rejected, (state) => {
        state.state = "failed";
      })
  },
});

// Export the action
export const overallAnalyticsState = (state: RootState) => state.overallAnalyticsData;
// Export the reducer

export default analyticsSlice.reducer;
