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
        $facet: {
          // to run multiple aggregation pipelines within a single stage
          // here we are getting the total clicks and unique users for the given urlId
          totalStats: [
            {
              $group: {
                _id: "$urlId",
                totalClicks: { $sum: 1 },
              },
            },
            {
              $limit: 10,
            },
            { $sort: { "urlId.totalClicks": -1 } },
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
    return res.status(200).json(urlData[0]);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: " url is not found", error: error.message });
  }
};

export default getUrls;
