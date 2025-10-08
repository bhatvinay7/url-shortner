import { Schema } from 'mongoose';
enum permissions {
  granted= 1,
  denied = 0,
}
enum deviceType{
  MOBILE = "mobile",
  DESKTOP = "desktop",
  TABLET = "tablet",
}
enum OSType{
  WINDOWS="Windows",
  MACOS="MacOS",
  ANDROID="Android",
  IOS="IOS",
  LINUX="Linux"
}

export const deviceSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId},  
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
      required: true
    }
  },
  userIp:{type:String},
  createdAt: { type: Date, default: Date.now },
});

deviceSchema.index({ geolocation: "2dsphere" });
deviceSchema.index({ user_id: 1 });         
deviceSchema.index({ urlId: 1 });
deviceSchema.index({ createdAt: -1 }); 


