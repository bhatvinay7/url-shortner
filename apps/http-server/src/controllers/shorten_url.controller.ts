import { Request, Response } from 'express';
import {Url} from 'mongodb'
const generateShortUrl= async(req:Request,res:Response)=>{    
try{
    const url=req.body.url
    const link=await Url.findOne({longUrl:url.trim()}) 
    if(link){
    res.sendStatus(200).json({message:"Your new url is generated",url:link?.shortUrl})
    }
}
    // push the link to queue
    catch(error:any){
    res.sendStatus(500).json({message:error.message})
     }
}

export default generateShortUrl