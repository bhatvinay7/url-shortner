import { Schema } from 'mongoose';
export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  refreshToken:{type:String,default:""},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});