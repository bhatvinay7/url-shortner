import axios from '../lib/axios'
import {userResponse,userSignupData,userSigninData} from 'types'

export const userSignup=async(data:userSignupData):Promise<userResponse>=>{
    const response= await axios.post('/api/user_signup',data)
    return response?.data as userResponse
}

export const userSignin=async(data:userSigninData):Promise<userResponse>=>{
    const response= await axios.post('/api/user_login',data)
    return response?.data as userResponse
}