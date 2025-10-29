'use client'
import UrlsComponent from '../components/ui/get-urls'
import { getUrlsData,urlsState } from '../lib/redux/featuresSlice/urlsSlice'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
export default  function Page() {
  const dispatch=useDispatch()
  const data=useSelector(urlsState)
   useEffect(()=>{
    dispatch(getUrlsData() as any)
   },[dispatch])

  return (
    <div className=" flex-1 h-screen w-full bg-inherit">
      <UrlsComponent
      data={data}
      />    
    </div>
  )
}  


