import {Connection,ConsumerStatus} from 'rabbitmq-client'
import dotenv from 'dotenv'
dotenv.config()
const connection = new Connection({url:process.env.RABBITMQ_CLUSTER_URL!,
  heartbeat: 90,
  connectionTimeout: 10000,
  })
connection.on('error', (err:any) => {
  console.log('RabbitMQ connection error', err)
})
connection.on('connection', () => {
  console.log('Connection successfully (re)established')
})

export default connection