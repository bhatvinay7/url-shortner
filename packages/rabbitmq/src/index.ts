import {Connection} from 'rabbitmq-client'
import {message} from 'types'
const rabbit = new Connection('amqp://guest:guest@localhost:5672')
rabbit.on('error', (err:any) => {
  console.log('RabbitMQ connection error', err)
})
rabbit.on('connection', () => {
  console.log('Connection successfully (re)established')
})
export  async function publishToQueue(message:message|string,topic:string,exhangeName:string,maxAttemts:number,routingKey:string){
  const pub = rabbit.createPublisher({
    confirm: true,
    maxAttempts: maxAttemts,
    exchanges: [{exchange: `${exhangeName}`, type: `${topic}`}]
  })
  
  await pub.send(
    {exchange: `${exhangeName}`, routingKey: routingKey},JSON.stringify(message))
}

export async function consumeFromQueue(topic:string,exhangeName:string,routingKey:string,queueName:string){
  const sub = rabbit.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [{ exchange: "exchange", routingKey: `${routingKey}` }],
    },
    async (msg) => {
      console.log("received message (user-events)", msg);
    }
  );
}
export default rabbit
