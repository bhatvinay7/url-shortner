import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config({path:'./env'})
let dbInstance: mongoose.mongo.Db | null = null;

export async function connectDB() {
  if (dbInstance) return dbInstance; // reuse existing connection

  try {
    
    await mongoose.connect(process.env.DB_URL! || 'mongodb+srv://bhatvinay74:yJcZTZl755aOvJqJ@cluster0.yxdhwpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
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