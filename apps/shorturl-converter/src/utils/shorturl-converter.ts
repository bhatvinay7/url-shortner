import connection from "rabbitmq";
import { ConsumerStatus } from "rabbitmq-client";
import { urlData } from "types";
import assignTopic from "./topicAssigner.js";
import mongoose from "mongoose";
import redis from "redisclient";
import { natsConnection, sc } from "nats-server";
import generatetHash from "./uniqueStringConverter.js";
import { Url, connectDB } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()
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
          const Message = JSON.parse(message.body.toString("utf8"));
          const userMessage: urlData = Message
          console.log(userMessage);
          try {
            natsConnection.publish(
              process.env.URL_STATUS!,
              sc.encode(
                JSON.stringify({
                  message: "processing your request...",
                  userId: userMessage.userId,
                  type: "notification",
                  status: 200,
                })
              )
            );

            if (userMessage?.url) {
              const data = await assignTopic(userMessage.url);
              natsConnection.publish(
                process.env.URL_CHANNAL!,
                sc.encode(
                  JSON.stringify({
                    message: "generating short url",
                    userId: userMessage.userId,
                    type: "notification",
                    status: 200,
                  })
                )
              );
              const hash = generatetHash(userMessage.url);
              const shortenUrl= Url.create({
                longUrl:userMessage.url,
                user: new mongoose.Types.ObjectId(userMessage.userId),
                shortUrl:hash,
                topic:data.topic,
                applicationContext:data.applicationContext,
              })
              redis.set(hash,userMessage.url)
              natsConnection.publish(
                "url-status",
                sc.encode(
                  JSON.stringify({
                    message: "New url successfully generated",
                    type: "notification",
                    status: 200,
                    userId: userMessage.userId,
                  })
                )
              );
              natsConnection.publish(
                "push-url",
                sc.encode(
                  JSON.stringify({
                    message: `${process.env.NEXT_PUBLIC_FRONTEND_URL!}/r/${hash}`,
                    type: "data",
                    userId: userMessage.userId,
                  })
                )
              );

              return ConsumerStatus.ACK;
            }
          } catch (error: any) {
           natsConnection.publish(
          "push-url",
          sc.encode(
            JSON.stringify({
              message: "Unable to process sudden error occured!",
              type: "error",
              status: 500,
              userId: JSON.parse("Error ocured!"),
            })
          )
        );
          }
        }
      } catch (err: any) {
        console.error("Consumer processing error:", err);
        natsConnection.publish(
          "push-url",
          sc.encode(
            JSON.stringify({
              message: "Unable to process sudden error occured!",
              type: "error",
              status: 500,
              userId: JSON.parse(err?.message),
            })
          )
        );
      }
    }
  );
}
