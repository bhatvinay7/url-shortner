import { Request, Response } from "express";
import { publishToQueue } from "../utils/rabbitmq-ptoducer.js";
import { Url } from "mongodb";
const generateShortUrl = async (req: Request, res: Response) => {
  try {
    const url = req.body.url;
    if(!url)return
    const link = await Url.findOne({ longUrl: url.trim() });
    if (link) {
      res
        .sendStatus(200)
        .json({ message: "Your new url is generated", url: link?.shortUrl });
    }
    try {
      const userData={url:url,userId:req.body.userId}   
      await publishToQueue(userData,"topic","url-metrics",2,"push-url",);
    } catch (error: any) {
      console.log(error.message);
    }
  } catch (error: any) {
    // push the link to queue
    res.sendStatus(500).json({ message: error.message });
  }
};

export default generateShortUrl;
