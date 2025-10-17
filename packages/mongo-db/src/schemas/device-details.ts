import { Schema } from 'mongoose';
export enum permissions {
  granted= "granted",
  denied = "denied",
}
export enum deviceType{
  MOBILE = "mobile",
  DESKTOP = "desktop",
  TABLET = "tablet",
}
export enum OSType{
  WINDOWS="Windows",
  MACOS="MacOS",
  ANDROID="Android",
  IOS="IOS",
  LINUX="Linux"
}

export const deviceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId},  
  osType: { type: String,enum:Object.values(OSType),required: true },
  osName: {type:String,required: true},
  urlId:{ type: Schema.Types.ObjectId,
  ref: 'Url',required:true},
  deviceType: { type: String,enum:Object.values(deviceType),required: true},
  deviceName: { type: String ,required: true},
  timeZone:{type:String,required:true},
  permission:{
    geolocation:{type:String},
    enum:Object.values(permissions)
  },
   geolocation: {
    type: {
      type: String,
      enum: ['Point'],     
      required: true
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  userIp:{type:String},
  createdAt: { type: Date, default: Date.now },
});

deviceSchema.index({ geolocation: "2dsphere" });        
deviceSchema.index({ createdAt: -1 }); 
deviceSchema.index({ userId: 1, osType: 1, deviceType: 1});


