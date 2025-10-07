import { Request, Response } from 'express';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

const googleauth= async(req:Request,res:Response)=>{
     try{

 const url =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=openid%20profile%20email` +
  `&prompt=select_account`;

  res.redirect(url);
     }
     catch(error:any){
        throw new Error(error.message)
     }
}
export default googleauth