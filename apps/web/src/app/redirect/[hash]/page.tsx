import React from 'react'
import { useParams } from 'next/navigation'
import {axiosPublic} from '../../../lib/axios'
import ErrorPage from '../../../components/ui/error-page'
import processData from '../../../utils/getdata'
export default async function Redirect(){
  try{
    const params=useParams<{hash:string}>()
    const hash=params.hash
    const data= await (processData())()
  
    await axiosPublic.post(`/api/redirect/${encodeURIComponent(hash)}`,{data})
  }
  catch(error:any){
   return <ErrorPage /> 
  }
  return (
    <div className='h-screen bg-white/75 w-full'>
      <p className='w-fit  absolute top-1/2 max-auto text-base text-indigo-950'>Loading...</p>
    </div>
  )
}
