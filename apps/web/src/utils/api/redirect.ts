import {axiosPrivate} from '../../lib/axios'
import {userResponse} from 'types'

export  async function redirectUser(hash:string):Promise<userResponse>{
    const response=await axiosPrivate.get(`/api/redirect/${encodeURIComponent(hash)}`)
    return response.data as userResponse

}