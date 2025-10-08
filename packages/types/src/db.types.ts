import { Document, Types } from 'mongoose';
export    interface url_document extends Document {
      longUrl:string,
      user:Types.ObjectId
      shortUrl:string
      refreshToken?:string
      topic:string
      isEmailVerified:boolean
       createdAt:Date | string
    }
    
export  interface device_document extends Document{
  user_id: Types.ObjectId ;
  osType: string
  osName: string
  urlId:Types.ObjectId,
  deviceType: string 
  deviceName: string
  createdAt:Date | string
  geolocation:{
  type:string  
  coordinates: [number, number]
};
  userIp:string,
}    

export interface user_document extends Document  {
  name: string,
  email: string,
  picture:string
  refreshToken: string,
  isEmailVerified:boolean
  createdAt:Date | string
  updatedAt:Date | string
}