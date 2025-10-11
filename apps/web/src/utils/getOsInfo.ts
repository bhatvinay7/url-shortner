function getOSFromUserAgent(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os x/i.test(ua)) return "MacOS";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown";
}

const getOSType = async (): Promise<string> => {
  if ((navigator as any).userAgentData) {
    const uaData = (navigator as any).userAgentData;
    const platform = uaData.platform || "unknown";

    return platform;
  }
  return getOSFromUserAgent(navigator.userAgent);
};


export default getOSType