import connection from "rabbitmq";
import { urlData, AsyncMessage } from "types";
import assignTopic from "./topicAssigner.js";
import generatetHash from "./uniqueStringConverter.js";
import { Url, connectDB } from "mongodb";
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
    },async (message) => {
            try{
            console.log("received message (user-events)", message);
            if(message){
            const userMessage: urlData = JSON.parse(
              message?.toString?.() ?? "{}"
            );

            if (userMessage?.url) {
              const data = await assignTopic(JSON.parse(userMessage.url));
              console.log(data);
              sub.ack(message);
            }
            }  
        } catch (err) {
          console.error("Consumer processing error:", err);
          if (sub && message) sub.nack(message, false, true);
        }
  }  
  )
}  
