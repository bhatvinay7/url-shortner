import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
let dbInstance: mongoose.mongo.Db | null = null;

export async function connectDB() {
  if (dbInstance) return dbInstance; // reuse existing connection

  try {
    
    await mongoose.connect(process.env.DB_URL!);
    const connection = mongoose.connection;
    if(connection.readyState==1){
      console.log("connected")
    }
    else if(connection.readyState==2){
      console.log("connecting")
    }
    dbInstance = connection.db ?? null;
    
    return dbInstance;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}