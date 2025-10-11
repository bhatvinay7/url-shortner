import express,{Request,Response,RequestHandler} from 'express'
import { JwtPayload } from 'jsonwebtoken';
export interface AuthRequest extends Request {
  user?:{userId:string,username:string,picture:string,token:string,isVerified:boolean}| JwtPayload;
}
const getCredentials=async (req:AuthRequest,res:Response)=>{
    try{
     if(!req.user){
         return res.status(401).json({message:"user is unauthorized"})
     }   
     
     return res.status(200).json(req.user)
    }
    catch(error:any){
        return res.status(500).json({message:"error.message"})
    }
}

export default getCredentials as RequestHandler