import connection from "rabbitmq";
import { Url } from "mongodb";
let sub:any=null;
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
      queueBindings: [{ exchange: `${exhangeName}`, routingKey: `${routingKey}` }],
    },
    async (message) => {
      try {
        { noAck: false }
        console.log("received message (user-events)",JSON.stringify(message));
        sub.ack(message);
      } catch (error: any) {
        sub.nack(message, false, true);
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
