import { Request, Response } from "express";
import { Devicedata, connectDB } from "mongodb";

interface customRequest extends Request {
  user?: {
    userId: string;
    username: string;
    picture: string;
    token: string;
    isVerified: boolean;
  };
}
const urlAnalytics = async (req: customRequest, res: Response) => {
  try {
    const urlId = req?.params?.urlId;
    if (!urlId) {
      return res.status(400).json({ message: "urlId is not provided" });
    }
    await connectDB();
    const urlData = await Devicedata.aggregate([
      { $match: { urlId: `${urlId}` }}, // Base filter for this short URL

      {
        $facet: {
          // to run multiple aggregation pipelines within a single stage
          // here we are getting the total clicks and unique users for the given urlId
          totalStats: [
            {
              $group: {
                _id: null,
                totalClicks: { $sum: 1 },
                uniqueUsers: { $addToSet: "$userId" },
              },
            },
            {
              $project: {
                _id: 0,
                totalClicks: 1,
                uniqueUsers: { $size: "$uniqueUsers" },
              },
            },
          ],

          last7Days: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
              },
            },
            { $sort: { createdAt: -1 } }, // descending
            {
              $group: {
                _id: {
                  day: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                },
                dailyClicks: { $sum: 1 },
              },
            },
            { $sort: { "_id.day": -1 } }, // latest day first
            { $limit: 7 }, // only last 7 days if needed
            { $project: { _id: 0, date: "$_id.day", dailyClicks: 1 } },
          ],

          // here we have remove the duplicate user clicks,because of that we have use extra grouping

          osType: [
            {
              $group: {
                _id: {
                  userId: "$userId",
                  osType: "$osType",
                },
                firstClick: { $first: "$createdAt" },
              },
            },
            {
              $group: {
                _id: "$_id.osType",
                uniqueUsers: { $addToSet: "$_id.userId" },
                uniqueClicks: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                osName: "$_id",
                uniqueClicks: 1,
                uniqueUsers: { $size: "$uniqueUsers" },
              },
            },
          ],

          deviceType: [
            {
              $group: {
                _id: {
                  userId: "$userId",
                  deviceType: "$deviceType",
                },
                firstClick: { $first: "$createdAt" },
              },
            },
            {
              $group: {
                _id: "$_id.deviceType",
                uniqueUsers: { $addToSet: "$_id.userId" },
                uniqueClicks: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                deviceName: "$_id",
                uniqueClicks: 1,
                uniqueUsers: { $size: "$uniqueUsers" },
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({ message: "data fetched", data: urlData[0] });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default urlAnalytics;
