import { Request, Response } from "express";
import { Url, Devicedata, connectDB } from "mongodb";

interface customRequest extends Request {
  user?: {
    userId: string;
    username: string;
    picture: string;
    token: string;
    isVerified: boolean;
  };
}
const overallAnalytics = async (req: customRequest, res: Response) => {
  try {
    await connectDB();
    const urlData = await Devicedata.aggregate([
      {
        $facet: {
          // to run multiple aggregation pipelines within a single stage
          // here we are getting the total clicks and unique users for the given urlId
          totalStats: [
            {
              $group: {
                _id: "$_id",
                totalUrls: { $addToSet: "$urlId" },
                totalClicks: { $sum: 1 },
                uniqueUsers: { $addToSet: "$userId" },
              },
            },
            {
              $project: {
                _id: 0,
                totalClicks: 1,
                uniqueUsers: { $size: "$uniqueUsers" },
                totalUrls: { $size: "$totalUrls" },
              },
            },
          ],

          // here we have remove the duplicate user clicks,because of that we have use extra grouping
          osType: [
            {
              $group: {
                _id: {
                  osType: "$osType",
                  totalUniqueCLicks: { $addToSet: "$osType" },
                  uniqueUsers: { $addToSet: "$userId" },
                },
              },
            },
            {
              $project: {
                _id: 0,
                totalClicks: { $size: "$totalCLicks" },
                uniqueUsers: { $size: "$uniqueUsers" },
              },
            },
          ],

          deviceType: [
            {
              $group: {
                _id: {
                  userId: "$userId",
                  osType: "$osType",
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

export default overallAnalytics;
