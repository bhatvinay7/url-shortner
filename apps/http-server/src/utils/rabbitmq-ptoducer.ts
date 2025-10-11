import connection from 'rabbitmq'
import {urlData} from 'types'
export  async function publishToQueue(message:urlData,topic:string,exhangeName:string,maxAttemts:number,routingKey:string){
 const  pub = connection.createPublisher({
    confirm: true,
    maxAttempts: maxAttemts,
    exchanges: [{exchange: `${exhangeName}`, type: `${topic}`}]
  })
  
  await pub.send(
    {exchange: `${exhangeName}`, routingKey: routingKey},JSON.stringify(message))
}