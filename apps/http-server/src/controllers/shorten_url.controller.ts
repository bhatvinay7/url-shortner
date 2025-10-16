import { Request, Response } from "express";
import { publishToQueue } from "../utils/rabbitmq-ptoducer.js";
import { userCredentials } from "types";
import connection from "rabbitmq";
import redis from "redisclient";

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
    const userLink = await redis.get(url);
    if (userLink) {
      res
        .sendStatus(200)
        .json({ message: "Your new url is generated", url: userLink });
    }
    const link = await Url.findOne({ longUrl: url.trim() });
    if (link) {
      res
        .sendStatus(200)
        .json({ message: "Your new url is generated", url: link?.shortUrl });
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
      res
        .sendStatus(200)
        .json({ message: "Your new url is being generated", url: null });
    } catch (error: any) {
      console.log(error.message);
    }
  } catch (error: any) {
    res.sendStatus(500).json({ message: error.message });
  }
};

export default generateShortUrl;
