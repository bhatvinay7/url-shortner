import { Request, Response } from "express";
import { Url, connectDB } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()
import { publishToQueue } from "../utils/rabbitmq-ptoducer.js";
const topic=process.env.TOPIC1!
const exchange=process.env.EXCHANGE_NAME1!
const routing_key=process.env.ROUTING_KEY1!

interface customRequest extends Request {
  user?: {
    userId: string;
    username: string;
    picture: string;
    token: string;
    isVerified: boolean;
  };
}
const collectData = async (req: customRequest, res: Response) => {
  try {
    await connectDB();
    const hash = decodeURIComponent(req?.params?.hash! ?? "");
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? (forwarded as string).split(',')?.[0] : req.socket.remoteAddress
    const message = req?.body
    if(!hash || !message){
      return res.status(400).json({message:"Invalid url or data is missing"})
    }
    const urlData= await Url.findOne({shortUrl:hash})
    console.log(urlData)
    if(!urlData){
      return res.status(400).json({message:"alias not found"})
    }
    const updatedMessage = { ...message, urlId: urlData?._id,userIp:ip,userId:req?.user?.userId };

    // push user device data to queue
    try {
      if (updatedMessage) {
        await publishToQueue(
          JSON.stringify(updatedMessage),
          topic,
          exchange,
          2,
         routing_key
        );
      }
    } catch (error: any) {
      console.log("publisher error " + error);
    }
    return res.status(200).json({message:"use data succesfully sent",url:urlData?.longUrl})
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default collectData;
