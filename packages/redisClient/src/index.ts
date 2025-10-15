import { createClient,RedisClientType } from 'redis';
import dotenv from 'dotenv';
dotenv.config();
const client:RedisClientType= createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD!,
    socket: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!)
    } 
});

export default client;
