import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getUserdata from "../utils/getUserdata.js";
import { User, connectDB } from "mongodb"; 
const SECRET_KEY = process.env.secret_key!;
const ACCESS_KEY= process.env.access_key!
const callbackHandler = async (req: Request, res: Response) => {
  try {
    await connectDB();

    const data = await getUserdata(req, res);
    if (!data?.email) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    let user= await User.findOne({ email: data.email });
    
    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
        isEmailVerified: true,
        picture: data.picture,
      })
    }
     const refreshToken = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: user._id,
        picture:user.picture,
        isVerified:true,
      },
        SECRET_KEY,
      { expiresIn: "24d" }
    );
    const acces_token = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: user._id,
        picture:user.picture,
        isVerified:true,
    
      },
          ACCESS_KEY ,
      { expiresIn: "7d" }
    );
    await User.findOneAndUpdate({email:user.email},{refreshToken:refreshToken})
    
    res.cookie("token", refreshToken , {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain:".shortner.services",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path:"/"
    });


    res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
  } catch (error: any) {
    console.error("OAuth Error:", error.message);
    return res.status(500).json({ message: "OAuth error", error: error.message });
  }
};

export default callbackHandler;
