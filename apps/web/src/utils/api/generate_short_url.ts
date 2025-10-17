import {axiosPrivate} from '../../lib/axios'
import {userResponse} from 'types'

export  async function get_shorten_url(url:string):Promise<userResponse>{
    const response=await axiosPrivate.post('/api/shorten_url',{url})
    return response.data as userResponse

}