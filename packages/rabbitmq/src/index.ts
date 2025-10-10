import {Connection,} from 'rabbitmq-client'
import {message} from 'types'
const connection = new Connection({url:'amqp://admin:admin123@rabbitmq:5672',
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