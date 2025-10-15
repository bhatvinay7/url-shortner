import { Request, Response } from "express";
import { Url, connectDB } from "mongodb";
import { publishToQueue } from "rabbitmq";
import redis from "redis";

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
    const hash = req?.body?.hash;
    const urlId=req?.params?.urlId;
    const message = req?.body?.message;
    const updatedMessage = { ...message, urlId: urlId };
    // push user device data to queue
    try {
      if (message) {
        await publishToQueue(
          JSON.stringify(message),
          "topic",
          "user-metrics",
          2,
          "data.collector"
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
    const url = redis.get(hash);

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
