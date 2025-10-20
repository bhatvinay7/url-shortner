import {getUrls} from '../utils/api/getUrls'
import UrlsComponent from '../components/ui/get-urls'
export default async function Page() {
  const response=await getUrls()
  
  return (
    <div className="w-full h-screen overflow-y-auto">
      <UrlsComponent
      data={response}
      />    
    </div>
  )

}  

