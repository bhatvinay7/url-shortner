import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userCredentials } from "types";
import redis from 'redisClient'
import { parse } from "dotenv";
const JWT_SECRET = process.env.secret_key!;
export interface AuthRequest extends Request {
  user?:
    | {
        userId: string;
        username: string;
        picture: string;
        token: string;
        isVerified: boolean;
      }
    | JwtPayload;
}
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken= req.cookies?.token;
    if ((!authHeader || !authHeader.startsWith("Bearer")) && !cookieToken) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const token = authHeader?.split(" ")[1] || cookieToken;
    const decoded = jwt.verify(token!, JWT_SECRET) as userCredentials;
    if(req.path.includes('/shorten_url')){
    try{

      
      const count = await redis.get(decoded.userId!);
      if(count && parseInt(count)>5){
        const time=await redis.get("startTime")
        if(!time){
          redis.set("startTime",Date.now()); // Set expiration time to 5 minutes
          redis.expire("startTime",300); // Set expiration time to 5 minutes
          redis.expire(decoded.userId!,300); // Set expiration time to 5 minutes
        }
        const startTime= await redis.get("startTime")  // updat the user with left time for next request
        const leftTime= startTime ? Date.now()-parseInt(startTime):0
        const waitTime= leftTime/1000
        return res.status(429).json({message:"Too many requests, please try again later",setTime:waitTime})
      }
      else{
        await redis.incr(decoded.userId!);
      }
    }
    catch(error:any){
     return res.status(429).json({message:"Too many requests, please try again later"})
    }
    } 
    const user = {
      userId: decoded?.userId,
      username: decoded?.username,
      picture: decoded?.picture,
      token: token,
      email: decoded.email,
      isVerified: true,
    };
    req.user = user;

    next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(403).json({ message: "Invalid token" });
  }
};
