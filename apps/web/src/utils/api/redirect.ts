import {axiosPrivate} from '../../lib/axios'
import {ClientInfo,userResponse} from 'types'

export  async function redirectUser(data:ClientInfo,hash:string):Promise<userResponse>{
    const response=await axiosPrivate.post(`/api/redirect/${encodeURIComponent(hash)}`,data)
    return response.data as userResponse

}