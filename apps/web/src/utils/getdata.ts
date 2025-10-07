import { ClientInfo } from "types";
import getGeoPosition from "./getGeoposition";
import getOSType from "./getOsInfo";


export default function processdata() {
  const collectdata = async () => {
    const ua = navigator.userAgent;
    // navigator.userAgentData may be undefined
    const uaData = (navigator as any).userAgentData ?? null;
    const platform = (navigator as any).platform ?? null;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    

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
      ua,
      uaData,
      platform,
      osType,
      deviceType,
      screenWidth,
      screenHeight,
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
