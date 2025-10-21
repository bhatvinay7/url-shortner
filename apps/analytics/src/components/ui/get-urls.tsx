"use client"
import React from 'react'
import Link from 'next/link'
import {custormdata} from "../../lib/redux/featuresSlice/urlsSlice"
export default function GetUrls({data}:{data:custormdata}) {
  type data={
    totalStats:{
    _id:string,
    totalClicks:number,
    longUrl:string
  }
    
  }
  interface each{
    longUrl:string,
    totalClicks:number,
    _id:string
  }
  if(!(data?.totalStats?.length>0)) return <></>
  return (
    <div className=" w-full flex flex-col justify-center items-center h-auto space-y-2 p-3 " >
      {data?.totalStats?.map((each:each)=>{
       return (
       <div className=' w-full md:w-3/5 bg-[#dedee6] flex flex-col  items-center rounded-md p-3'>
         <div className='  self-start text-black text-base min-w-[320px] line-clamp-1 '>{each?.longUrl}</div>
         <div className='w-full flex flex-col gap-x-2'>
            <div className='flex  space-x-1.5 space-y-2 mt-2'>
            <span className='text-indigo-800 text-base'>Total clicks :</span> 
            <span className='text-black/75 text-base'>{each?.totalClicks}</span>
            </div>
            <Link className=' text-base border  w-fit p-0.5 border-black/15 bg-[#f2eeba] rounded-md text-black/60' href={`/individual_url_analytics/${each?._id}`}>view more</Link>
         </div>
       </div>
       )
      })}
    </div>
  )
}
