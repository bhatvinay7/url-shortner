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

  platform?: string | null;
  deviceType?: "mobile" | "tablet" | "desktop";
  osType?:string |unknown;
  timezone?: string | null;
  geolocation?: { latitude: number; longitude: number } | null;
  permissions?: { geolocation?: string };
  ip?:string |null;
  userId?:string |null;
  timestamp:string
};

export interface message extends ClientInfo{
      token:string;
      messageType:string;
      isClickEvent?:boolean |null;
      isRedirected?:boolean |null

}