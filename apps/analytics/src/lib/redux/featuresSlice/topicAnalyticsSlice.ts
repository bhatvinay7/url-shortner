import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { topicAnalyticsData } from "types";
import { getTopicAnalytics } from "../../../utils/api/topicAnalytics";

const initialState: topicAnalyticsData = {
    totalStats:{
        totalClicks: 0,
        uniqClicks: 0
    },
    urlsArray:[{
        shortUrl: "",
        totalClicks: 0,
        uniqueUsers: 0
    }],
    state:"loading"
};


export const topicAnalytics = createAsyncThunk(
  "getTopicAnalytics",
  async ( topic:string, thunkAPI) => {
    try {
      const res = await getTopicAnalytics(topic);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


const analyticsSlice = createSlice({
  name: "topicAnalyticsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topicAnalytics.pending, (state) => {
        state.state = "loading";
      }).addCase(topicAnalytics.fulfilled, (state, action) => {
        state.totalStats=action.payload.totalStats
        state.urlsArray=action.payload.urlsArray
        state.state="succeeded"
      }).addCase(topicAnalytics.rejected, (state) => {
        state.state = "failed";
      })
  },
});

// Export the action
export const topicAnalyticsState = (state: RootState) => state.topicAnalyticsData;
// Export the reducer

export default analyticsSlice.reducer;
