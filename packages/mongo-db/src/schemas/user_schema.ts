import { Schema } from 'mongoose';
export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  refreshToken:{type:String,default:""},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


userSchema.index({ email: 1 });