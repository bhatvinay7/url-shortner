import { Request, Response } from "express";
import { Url, connectDB } from "mongodb"; 
import client from  'redis'

const redirect = async (req: Request, res: Response) =>{
  try {
    await connectDB();
    const hash = req?.body?.hash;
    if(!hash){
         return res.status(400).json({ message: 'url is invalid,provide valid url' });
    }
    const url=client.get(hash)
    if(url){
       res.redirect(`${url}`);
    }
    const link=await Url.findOne({shortUrl:decodeURIComponent(hash)})

    res.redirect(`${link?.longUrl}`);
  } catch (error: any) {
   
    res.status(500).json({ message: " url is not found", error: error.message });
  }
};

export default redirect;
