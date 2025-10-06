import {Types} from 'mongoose'
import type {deviceSchemaType} from "./db.types.js"
export interface url{
    message:string,
    shortUrl:string
}
enum behaviour{
    isClicked= "TRUE"
}
export interface userData {
       token:string
       userId: string
       osType: string
       osName: string
       deviceType: string 
       deviceName: string
       createdAt:Date | string
       geolocation:{
       type:string  
       coordinates: [number, number]
    },
    type:behaviour
}

