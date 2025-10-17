function getOSFromUserAgent(ua: string): string {
  if (/windows/i.test(ua)) return "WINDOWS";
  if (/macintosh|mac os x/i.test(ua)) return "MACOS";
  if (/android/i.test(ua)) return "ANDROID";
  if (/iphone|ipad|ipod/i.test(ua)) return "IOS";
  if (/linux/i.test(ua)) return "LINUX";
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