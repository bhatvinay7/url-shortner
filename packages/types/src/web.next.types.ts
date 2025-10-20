import mongoose from "mongoose";
export enum state { 
  SUCCESS="success",
  FAILURE="failure"
}
export interface NotificationProps {
  message: string |null;
  type: state
  show: boolean;
  onClose?: () => void;
}

export type ClientInfo = {
  deviceType?: "mobile" | "tablet" | "desktop";
  deviceName?:string;
  osName?:string;
  osType?:string;
  timeZone?: string;
  geolocation?: { latitude: number; longitude: number } |null;
  permission?: { geolocation?: string };
  userIp?:string;
  userId?:string;
  urlId?: string | mongoose.Types.ObjectId;
}
export type message={
  userId:string,
  token:string
}
