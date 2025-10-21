import { Request, Response } from "express";
import { Url, Devicedata, connectDB } from "mongodb";
import mongoose from "mongoose";
interface customRequest extends Request {
  user?: {
    userId: string;
    username: string;
    picture: string;
    token: string;
    isVerified: boolean;
  };
}
const urlToppicAnalytics = async (req: customRequest, res: Response) => {
  try {
    const topic = req?.params?.topic?.trim();
    if (!topic) {
      return res.status(400).json({ message: "topic is not provided" });
    }
    await connectDB();
    const urls = await Url.find({ topic }).select('_id');
    const urlIds = urls.map((u) => u._id);
    console.log(urlIds)
    const urlData = await Devicedata.aggregate([
      { $match: { urlId: { $in: urlIds } } },

      {
        $lookup: {
          from: "urls", // collection name
          localField: "urlId",
          foreignField: "_id",
          as: "urlInfo",
        },
      },
      { $unwind: "$urlInfo" },

      // run parallel aggregation pipelines
      {
        $facet: {
          totalStats: [
            {
              $match: { "urlInfo.topic": topic },
            },
            {
              $group: {
                _id: null,
                totalClicks: { $sum: 1 },
                uniqClicks: { $addToSet: "$userId" },
              },
            },
            {
              $project: {
                _id: 0,
                totalClicks: 1,
                uniqClicks: { $size: { $ifNull: [ "$uniqClicks", []] } },
                
              },
            },
          ],

          urlsArray: [
            {
              $group: {
                _id: "$urlInfo._id",
                shortUrl: { $first: "$urlInfo.shortUrl" },
                totalClicks: { $sum: 1 },
                uniqueUsers: { $addToSet: "$userId" },
              },
            },
             {
              $project: {
                _id: 0,
                shortUrl:1,
                totalClicks: 1,
                uniqueUsers: { $size: { $ifNull: [ "$uniqueUsers", []] } },
                
              },
            },
          ],
        },
      },
    ]);
    return res.status(200).json(urlData[0]);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default urlToppicAnalytics;
