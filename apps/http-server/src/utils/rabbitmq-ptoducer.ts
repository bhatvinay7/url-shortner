import connection from 'rabbitmq'
export  async function publishToQueue(message:string,topic:string,exhangeName:string,maxAttemts:number,routingKey:string){
 const  pub = connection.createPublisher({
    confirm: true,
    maxAttempts: maxAttemts,
    exchanges: [{exchange: `${exhangeName}`, type: `${topic}`}]
  })
  
  await pub.send(
    {exchange: `${exhangeName}`, routingKey: routingKey},JSON.stringify(message))
}