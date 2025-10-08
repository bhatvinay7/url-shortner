import { Schema } from 'mongoose';
export const deviceSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId},  
  osType: { type: String, required: true },
  osName: {type:String,required: true},
  urlId:{ type: Schema.Types.ObjectId,
  ref: 'Url',required:true},
  deviceType: { type: String, required: true},
  deviceName: { type: String ,required: true},
   geolocation: {
    type: {
      type: String,
      enum: ['Point'],     
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  userIp:{type:String},
  createdAt: { type: Date, default: Date.now },
});