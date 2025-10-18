import {axiosPrivate} from '../../lib/axios'
import {userResponse,ClientInfo} from 'types'

export  async function collect_user_data(data:ClientInfo,hash:string):Promise<userResponse>{
    const response=await axiosPrivate.post(`/api/collectData/${encodeURIComponent(hash)}`,data)
    return response.data as userResponse
}