import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import authRouter from './controllers/googleAuthHandler'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRouter)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
