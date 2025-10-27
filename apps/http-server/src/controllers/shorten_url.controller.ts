import { Request, Response } from "express";
import { publishToQueue } from "../utils/rabbitmq-ptoducer.js";
import { userCredentials } from "types";
import connection from "rabbitmq";
import dotenv from 'dotenv'
dotenv.config()
const topic=process.env.TOPIC2!
const exchange=process.env.EXCHANGE_NAME2!
const routing_key=process.env.ROUTING_KEY2!

interface authRequest extends Request {
  user: userCredentials;
}
import { Url } from "mongodb";
const generateShortUrl = async (req: authRequest, res: Response) => {
  try {

    const url = req?.body?.url;
    if (!url) {
      return res.status(400).json({ message: "url is not provided" });
    }
   
    const link = await Url.findOne({ longUrl: url.trim() });
    if (link) {
    return  res
        .status(200)
        .json({ message: "Your new url is generated", url:`${process.env.NEXT_PUBLIC_FRONTEND_URL!}/r/${link?.shortUrl}`});
    }
    try {
      await connection.onConnect(120, true);
      const userData: { url: string; userId: string } = {
        url: url!,
        userId: req?.user?.userId!,
      };
      await publishToQueue(
        JSON.stringify(userData),
        topic,
        exchange,
        2,
        routing_key
      );
      return res
        .status(200)
        .json({ message: "Your request is accepted", url: null });
    } catch (error: any) {
      console.log(error.message);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
};

export default generateShortUrl;
