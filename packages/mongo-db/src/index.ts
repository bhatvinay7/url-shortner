import 'dotenv/config'; 
import express from 'express'
const app=express()
import {User} from './models/user-model.js'
import {Devicedata} from './models/device-model.js'
import {permissions,deviceType,OSName} from './schemas/device-details.js'
import {Url} from './models/shorturl-model.js'
import {connectDB} from './connection.js'

async function main() {
  try {
    await connectDB();
    console.log('Database connected');

  } catch (error: any) {
    console.error('Failed to start server:', error);
  }
}

main();
export {User,Devicedata,Url,connectDB,permissions,deviceType,OSName}

app.listen(3766,()=>{{
    
}})