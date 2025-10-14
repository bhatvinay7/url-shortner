import React from 'react'
import { useParams } from 'next/navigation'
import {axiosPublic} from '../../../lib/axios'
import ErrorPage from '../../../components/ui/error-page'
export default async function Redirect(){
  try{
    const params=useParams<{hash:string}>()
    const hash=params.hash
    await axiosPublic.post('/redirect/redirect-click',{hash})

  }
  catch(error:any){
   return <ErrorPage /> 
  }
  return (
    <div>
      
    </div>
  )
}
