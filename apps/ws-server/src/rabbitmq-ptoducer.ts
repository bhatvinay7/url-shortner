import rabbit from 'rabbitmq'
import {message} from 'types'
export  async function publishToQueue(message:message|string,topic:string,exhangeName:string,maxAttemts:number,routingKey:string){
 const  pub = rabbit.createPublisher({
    confirm: true,
    maxAttempts: maxAttemts,
    exchanges: [{exchange: `${exhangeName}`, type: `${topic}`}]
  })
  
  await pub.send(
    {exchange: `${exhangeName}`, routingKey: routingKey},JSON.stringify(message))
}