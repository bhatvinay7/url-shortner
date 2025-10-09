import rabbit from 'rabbitmq'
import {urlData} from 'types'
import assignTopic from './utils/topicAssigner.js';
import generatetHash from "./utils/uniqueStringConverter.js";
import { Url, connectDB } from "mongodb";
export async function consumeFromQueue(topic:string,exhangeName:string,routingKey:string,queueName:string){
 await connectDB();
 const sub = rabbit.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [{ exchange: "exchange", routingKey: `${routingKey}` }],
    },
    async (message:urlData) => {
      const userMessage=JSON.parse(message)  
      const data= await assignTopic(JSON.parse(message?.url!))
      console.log(data)
    }
  );
}