import axios from '../../lib/axios'
import {userResponse,userSigninData} from 'types'

export const userSignin=async(data:userSigninData):Promise<userResponse>=>{
    const response= await axios.post('/api/user_login',data)
    return response?.data as userResponse
}