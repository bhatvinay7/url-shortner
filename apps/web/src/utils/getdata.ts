import os from "os";
import { ClientInfo } from "types";
import getGeoPosition from "./getGeoposition";
import getOSType from "./getOsInfo";

export default function processdata() {
  const collectdata = async () => {
    const ua = navigator.userAgent;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
    let deviceType: ClientInfo["deviceType"] = "desktop";
    const uaLower = ua.toLowerCase();
    if (/mobi|iphone|android.*mobile|windows phone/.test(uaLower))
      deviceType = "mobile";
    else if (/tablet|ipad|android(?!.*mobile)/.test(uaLower))
      deviceType = "tablet";

    const geolocation = (await getGeoPosition()) ?? null;
    
    const osType=os.type
    const deviceName=os.hostname 
    const osName=(await getOSType()) ?? ""
    //  query Permissions API for geolocation permission state
    

    const payload: ClientInfo = {
      osType,
      osName,
      deviceName,
      deviceType,
      timeZone,
      geolocation,
      permissions: { geolocation: "" },
      timestamp: new Date().toISOString(),
      userIp: "",
      userId:"",
    };

    return payload;
  };
  return collectdata;
}
