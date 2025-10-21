'use client'
import React from 'react'
import { useEffect } from 'react';
import AnalyticsDashboard from "../../components/ui/AnalyticsDashboard";
import {useSelector,useDispatch} from 'react-redux'
import {overallAnalyticsState,OverallAnalytics} from '../../lib/redux/featuresSlice/overallAnalytics'
export default function Page() {
    const disPatch=useDispatch()
    const data=useSelector(overallAnalyticsState)  
    useEffect(()=>{
      disPatch(OverallAnalytics() as any)
      console.log(data.totalStats)
  
    },[disPatch])
  return (
    <div className='w-full min-h-screen  bg-inherit '>
      <AnalyticsDashboard
        deviceType={data.deviceType}
        osType={data.osType}
        totalStats={data.totalStats}
        
        />   
    </div>
  )
}
