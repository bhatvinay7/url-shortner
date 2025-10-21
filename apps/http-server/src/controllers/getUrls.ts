import { Request, Response } from "express";
import { Devicedata, connectDB } from "mongodb";
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
const getUrls = async (req: customRequest, res: Response) => {
  try {
    await connectDB();
    const urlData = await Devicedata.aggregate([
      {
        $lookup: {
          from: "urls", // collection name
          localField: "urlId",
          foreignField: "_id",
          as: "urlInfo",
        },
      },
      { $unwind: "$urlInfo" },
      {
        $group: {
          _id: "$urlInfo._id",
          longUrl: { $first: "$urlInfo.longUrl" },
          totalClicks: { $sum: 1 },
        },
      },
      { $sort: { totalClicks: -1 } },
      {
        $limit: 10,
      },
      {
        $facet: {
          totalStats: [
            {
              $project: {
                _id: 1,
                totalClicks: 1,
                longUrl: 1,
              },
            },
          ],
        },
      },
    ]);

    return res.status(200).json(urlData[0]?.totalStats);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default getUrls;
