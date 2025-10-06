import { Document, Types } from 'mongoose';
export    interface urlSchemaType {
      longUrl:string,
      user:Types.ObjectId
      shortUrl:string
      refreshToken?:string
      topic:string
      isEmailVerified:boolean
       createdAt:Date | string
    }
    
export  interface deviceSchemaType{
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

export interface userSchemaType {
  name: string,
  email: string,
  password: string,
  refreshToken: string,
  isEmailVerified:boolean
  createdAt:Date | string
  updatedAt:Date | string
}