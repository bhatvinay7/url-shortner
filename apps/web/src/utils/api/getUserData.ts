import {axiosPublic} from '../../lib/axios'
import {userCredentials} from 'types'

export  async function getUserDetails():Promise<userCredentials>{
    const response=await axiosPublic.get('/user/api/getCredentials')
    return response.data as userCredentials

}