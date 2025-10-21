export interface userResponse {
  message: string;
  url: string | null;
}
export interface userSigninData {
  email: string;
  password: string;
}
export interface userCredentials {
  username: string | null;
  userId: string | null;
  isVerified: boolean | null;
  picture: string | null;
  email: string;
  token: string;
}

export interface overallAnalyticsData {
  deviceType: [
    {
      uniqueClicks: number;
      deviceName: string |null;
      uniqueUsers: number;
    },
  ];
  osType: [
    {
      uniqueClicks: number;
      osType: string |null;
      uniqueUsers: number;
    },
  ];
  totalStats: [{
    totalClicks: number;
    totalUrls: number;
    uniqueUsers: number;
  }],
  state?:string
}

export interface topicAnalyticsData {
    totalStats:[{
        totalClicks: number,
        uniqClicks:number
    }],
    urlsArray:[{
        shortUrl: string,
        totalClicks: number,
        uniqueUsers: number
    }],
     state?:string
}

export interface individualUrlAnalyticsData {
  deviceType: [{ uniqueClicks: number; deviceName: string|null; uniqueUsers: number }]

  last7Days: [{
    dailyClicks: number;
    date: string;
  }],
  osType: [{
    uniqueClicks: number;
    osType: string|null;
    uniqueUsers: number;
  }],

  totalStats: [{
    totalClicks: number;
    uniqueUsers: number;
  }],
   state?:string

}

export interface urlsData{
      _id: string,
      totalClicks: number,
      longUrl:string
}
