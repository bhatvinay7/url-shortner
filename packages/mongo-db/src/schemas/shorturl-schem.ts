import { Schema } from 'mongoose';
export const urlSchema = new Schema({
  longUrl: { type: String, required: true },
  user:{ type: Schema.Types.ObjectId,
  ref: 'User',required:true},
  shortUrl: { type: String, required: true, unique: true },
  topic: { type: String ,default:"",required:false},
  createdAt: { type: Date, default: Date.now },
});