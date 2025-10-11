import {Request,Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
async function getData(req:Request,res:Response){
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Missing code parameter' });
    }
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { access_token, id_token } = tokenResponse.data;

    const userResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
   return userResponse.data;
}

export default getData