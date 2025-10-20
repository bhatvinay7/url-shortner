import { Schema } from 'mongoose';
import mongoose from 'mongoose';
enum Topics{
  ACQUISITION="acquisition",
  ACTIVATION="activation",
  RETENTION="retention",
}
export const urlSchema = new Schema({
  longUrl: { type: String, required: true },
  user:{ type: mongoose.Schema.Types.ObjectId,
  ref: 'User',required:true},
  shortUrl: { type: String, required: true, unique: true },
  topic: { type: String,enum:Object.values(Topics),default:"",required:false},
  applicationContext:{type:String,required:false,default:""},
  createdAt: { type: Date, default: Date.now },
});

urlSchema.index({ topic: 1 });
urlSchema.index({ longUrl: 1 });
urlSchema.index({ shortUrl: 1 });
