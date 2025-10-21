'use client'
import React from 'react'
import TopicAnalytics from '../../../components/ui/topicAnalytics'
import {useSelector} from 'react-redux'
import {topicAnalyticsState} from '../../../lib/redux/featuresSlice/topicAnalyticsSlice'
export default function Page() {
  const topicUrlData=useSelector(topicAnalyticsState)
  return (
    <div className='w-full min-h-screen   bg-inherit  '>
      <TopicAnalytics
      totalStats={topicUrlData.totalStats} 
      urlsArray={topicUrlData.urlsArray}
      />
    </div>
  )
}
