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
const urlToppicAnalytics = async (req: customRequest, res: Response) => {
  try {
    const topic = req?.params?.topic;
    if (!topic) {
      return res.status(400).json({ message: "topic is not provided" });
    }
    await connectDB();
    const urls = await Url.find({ topic }).select('_id');
    const urlIds = urls.map((u) => u._id);

    const urlData = await Devicedata.aggregate([
      { $match: { urlId: { $in: urlIds } } },

      {
        $lookup: {
          from: "Url", // collection name
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
              $match: { "urlInfo.topic": `${topic}` },
            },
            {
              $group: {
                _id: "$urlId",
                totalClicks: { $sum: 1 },
                uniqClicks: { $addToSet: "$userId" },
              },
            },
            {
              $project: {
                _id: 0,
                totalClicks: 1,
                uniqClicks: { $size: "$uniqClicks" },
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
          ],
        },
      },
    ]);
    return res.status(200).json({ message: "data fetched", data: urlData[0] });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default urlToppicAnalytics;
