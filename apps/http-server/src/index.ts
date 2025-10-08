import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from './routers/googlerouteHandler.js'
import urlRouter from  './routers/shortenUrl.js'
import { authMiddleware } from "./utils/middleware.js";
const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();
const options=cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_URL!],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  } )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(options);
app.use(authRouter)
app.use(authMiddleware)
app.use(urlRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});