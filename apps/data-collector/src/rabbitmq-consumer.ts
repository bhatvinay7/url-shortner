import rabbit from 'rabbitmq'
import {Url} from 'mongodb'
export async function consumeFromQueue(topic:string,exhangeName:string,routingKey:string,queueName:string){
 const sub = rabbit.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [{ exchange: "exchange", routingKey: `${routingKey}`}],
    },
    async (message) => {
     
      console.log("received message (user-events)",message);
    }
  );
}