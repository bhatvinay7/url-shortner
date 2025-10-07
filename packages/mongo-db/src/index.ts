import 'dotenv/config'; 
import express from 'express'
const app=express()
import {User} from './models/user-model.js'
import {Devicedata} from './models/device-model.js'
import {Url} from './models/shorturl-model.js'
import {connectDB} from './connection.js'

async function main() {
  try {
    await connectDB(); // make sure DB is connected before starting server
    console.log('Database connected');

  } catch (error: any) {
    console.error('Failed to start server:', error);
  }
}

main();
export {User,Devicedata,Url,connectDB}

app.listen(3766,()=>{{
    
    console.log("hii")
}})