import { Schema } from 'mongoose';
import {urlSchemaType} from 'types'
export const urlSchema = new Schema({
  longUrl: { type: String, required: true },
  user:{ type: Schema.Types.ObjectId,
  ref: 'User',required:true},
  shortUrl: { type: String, required: true, unique: true },
  topic: { type: String ,default:"",required:false},
  createdAt: { type: Date, default: Date.now },
});