import {axiosPublic} from '../../lib/axios'
import {userCredentials} from 'types'

export  async function getUserDetails():Promise<userCredentials>{
    const response=await axiosPublic.get('/api/userCredentials')
    return response.data as userCredentials

}