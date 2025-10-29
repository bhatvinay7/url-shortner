"use client"
import React from 'react'
import Link from 'next/link'
import {custormdata} from "../../lib/redux/featuresSlice/urlsSlice"
import Copy from '../ui/copy'
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
  if((data?.totalStats?.length==0)) return <></>
  return (
    <div className=" w-full flex-1 flex-col items-center h-auto overflow-y-hidden  space-y-2 p-3 " >
      <div className=' w-full sm:w-3/5 mx-auto flex h-auto items-center'>

      {data?.totalStats?.map((each:each)=>{
        return (
       <div className=' w-full bg-[#3434360d] flex flex-col relative items-center rounded-md p-3'>
         {<div className=' absolute top-1 right-2 '>
          <Copy
          text={each.longUrl}
          />
          </div>  
         }
         <div className='w-full flex flex-col p-1 items-start'>
            <div className='text-black/75 text-sm sm:text-base p-0.5 text-wrap max-w-9/10 overflow-x-auto custom-scroll '>{each.longUrl}</div> 
            <div className='flex  space-x-1.5'>
            <span className='text-indigo-800 text-base'>Total clicks :</span> 
            <span className='text-black/75 text-base'>{each?.totalClicks}</span>
            </div>
            <Link className=' text-[12px] border  w-fit p-1  border-black/15  bg-[#f2eeba] rounded-md text-black/60' href={`/individual_url_analytics/${each?._id}`}>view more</Link>
         </div>
       </div>
       )
      })}
    </div>
      </div>
  )
}
