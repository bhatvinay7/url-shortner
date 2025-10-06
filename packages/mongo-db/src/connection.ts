import mongoose from 'mongoose';

let dbInstance: mongoose.Connection | null = null;

export async function connectDB() {
  if (dbInstance) return dbInstance; // reuse existing connection

  try {
    await mongoose.connect('mongodb://127.0.0.1/my_database');
    const db = mongoose.connection;

    dbInstance = db;
    return dbInstance;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}
