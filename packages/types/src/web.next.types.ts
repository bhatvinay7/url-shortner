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
