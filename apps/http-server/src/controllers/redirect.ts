import { Request, Response } from "express";
import { Url, connectDB } from "mongodb";
import { publishToQueue } from "../utils/rabbitmq-ptoducer.js";
import redis from "redisclient";
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
const redirect = async (req: customRequest, res: Response) => {
  try {
    await connectDB();
    const hash = decodeURIComponent(req?.params?.hash! ?? "");
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? (forwarded as string).split(',')?.[0] : req.socket.remoteAddress
    const message = req?.body?.data
    if(!hash || !message){
      return res.status(400).json({message:"Invalid url or data is missing"})
    }
    const urlId= await Url.findOne({shortUrl:hash}).select('_id')

    const updatedMessage = { ...message, urlId: urlId,ip:ip };
    console.log(updatedMessage)
    // push user device data to queue
    try {
      if (message) {
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

    if (!hash) {
      return res
        .status(400)
        .json({ message: "url is invalid,provide valid url" });
    }
    const url :string|null= await redis.get(hash);

    if (url) {
      return res.status(404).json({ message: "url is not found" });
    }
    const link = await Url.findOne({ shortUrl: hash });
    res.redirect(`${link?.longUrl}`);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default redirect;
