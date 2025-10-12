import connection from "rabbitmq";
import { ConsumerStatus } from "rabbitmq-client";
import { Url } from "mongodb";
let sub:any=null;
export async function consumeFromQueue(
  topic: string,
  exhangeName: string,
  routingKey: string,
  queueName: string
) {
  await connection.onConnect(120,true)
  sub = connection.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [{ exchange: `${exhangeName}`, routingKey: `${routingKey}` }],
      
    },
    async (message) => {
      try {
        console.log("received message (user-events)",JSON.parse(message.body.toString("utf8")));
        ConsumerStatus.ACK
      } catch (error: any) {
        return 1
      }
    },
  );
}
export async function onShutdown() {
  await sub.close();
  await connection.close();
}
process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown);
