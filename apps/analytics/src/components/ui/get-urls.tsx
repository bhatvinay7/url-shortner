"use client"
import React from 'react'
import Link from 'next/link'
import {urlsData} from 'types'
export default function GetUrls({data}:{data:urlsData}) {
  
  if(!(data?.totalStats?.length>0)) return <></>
  return (
    <div className="w-full h-auto p-3" >
      {data?.totalStats?.map((each)=>{
       return (
       <div className='w-full bg-[hsl(240,33%,94%)] flex flex-col items-center rounded-md p-3'>
         <div className='bg-[hsl(240,1%,19%)]  text-white text-base'>{each?.longUrl}</div>
         <div className='w-full flex gap-x-2'>
            <span className='text-gray-200 text-base'>{each?.totalClicks}</span>
            <Link className='text-[hsl(240,44%,65%)] text-xs' href={`/individual_url_analytics/:${each?._id}`}>view more</Link>
         </div>
       </div>
       )
      })}
    </div>
  )
}
