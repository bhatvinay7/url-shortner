import { configureStore,EnhancedStore } from '@reduxjs/toolkit'
import individualUrlAnalyticsReducer from './featuresSlice/individualUrlAnalyticsSlice';
import overallAnalyticsReducer  from './featuresSlice/overallAnalytics';
import topicAnalytics from './featuresSlice/topicAnalyticsSlice';
import adminReducer from './featuresSlice/adminDetailSlice'
export const makeStore= ():EnhancedStore => {
  return configureStore({
    reducer: {
        admin:adminReducer,
        individualUrlAnalyticsData:individualUrlAnalyticsReducer,
        overallAnalyticsData:overallAnalyticsReducer,
        topicAnalyticsData:topicAnalytics,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']