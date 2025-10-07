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
  ua?: string;
  uaData?: any;
  platform?: string | null;
  deviceType?: "mobile" | "tablet" | "desktop";
  screenWidth?: number;
  osType?:string |unknown;
  screenHeight?: number;
  timezone?: string | null;
  geolocation?: { latitude: number; longitude: number } | null;
  permissions?: { geolocation?: string };
  ip?:string |null;
  userId?:string |null;
  timestamp:string
};