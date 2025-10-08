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

    const osType=(await getOSType()) ?? ""
    //  query Permissions API for geolocation permission state
    let geolocationPermission: string | undefined;
    try {
      //  navigator.permission supported by some browsers
      const perm = await (navigator as any).permissions?.query?.({
        name: "geolocation",
      });
      geolocationPermission = perm?.state;
    } catch {
      geolocationPermission = undefined;
    }

    const payload: ClientInfo = {
      osType,
      deviceType,
      timezone,
      geolocation,
      permissions: { geolocation: geolocationPermission },
      timestamp: new Date().toISOString(),
      ip: "",
      userId:"",
    };

    return payload;
  };
  return collectdata;
}
