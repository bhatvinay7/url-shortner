import {Connection} from 'rabbitmq-client'

const rabbit = new Connection('amqp://guest:guest@localhost:5672')
rabbit.on('error', (err:any) => {
  console.log('RabbitMQ connection error', err)
})
rabbit.on('connection', () => {
  console.log('Connection successfully (re)established')
})


export default rabbit