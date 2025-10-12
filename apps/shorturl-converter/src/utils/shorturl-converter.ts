import connection from "rabbitmq";
import { ConsumerStatus } from "rabbitmq-client";
import { urlData } from "types";
import assignTopic from "./topicAssigner.js";
import mongoose from "mongoose";
import generatetHash from "./uniqueStringConverter.js";
import { Url, connectDB } from "mongodb";
import { Channel } from "diagnostics_channel";
let sub: any = null;
export async function consumeFromQueue(
  topic: string,
  exhangeName: string,
  routingKey: string,
  queueName: string
) {
  sub = connection.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [
        { exchange: `${exhangeName}`, routingKey: `${routingKey}` },
      ],
      noAck: false,
      
    },
    async (message) => {
      try {
        console.log("received message (user-events)", message);
        await connectDB();
        if (message) {
          const userMessage: urlData = JSON.parse(message.body.toString("utf8")) 
          console.log(userMessage);
          if (userMessage?.url) {
            const data = await assignTopic(userMessage.url);
            const hash = generatetHash(userMessage.url);
            console.log(hash + " " + "hash");
            // const shortenUrl= Url.create({
            //   longUrl:userMessage.url,
            //   user: new mongoose.Types.ObjectId(userMessage.userId),
            //   shortUrl:hash,
            //   topic:data.topic,
            //   applicationContext:data.applicationContext,
            // })
          return ConsumerStatus.ACK;    
           
          }
        }
      }
      catch (err) {
        console.error("Consumer processing error:", err);
        return 1
      }
    },
    
  );
}
