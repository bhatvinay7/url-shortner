'use client'
import React from 'react'
import {useEffect} from 'react'
import {UrlAnalytics,individualUrlAnalyticState} from '../../../lib/redux/featuresSlice/individualUrlAnalyticsSlice'
import {useParams} from 'next/navigation'
import IndividualUrlAnalytics from '../../../components/ui/Invidual_url_analytics'
import { useSelector,useDispatch } from 'react-redux'
export default function Page() {
  const dispatch=useDispatch()
  const urlsData=useSelector(individualUrlAnalyticState)
  const params=useParams<{urlId:string}>()
  useEffect(()=>{
    dispatch(UrlAnalytics(params?.urlId) as any)
  },[params])
  return (
    <div className='w-full min-h-screen '>
       <IndividualUrlAnalytics
       osType={urlsData?.osType}
       deviceType={urlsData?.deviceType}
       last7Days={urlsData?.last7Days}
       totalStats={urlsData?.totalStats}
       />
    </div>
  )
}
