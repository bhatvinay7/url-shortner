import {axiosPrivate} from '../../lib/axios'
import {userResponse} from 'types'

export  async function getUserDetails():Promise<userResponse>{
    const response=await axiosPrivate.get('/api/shorten_url')
    return response.data as userResponse

}