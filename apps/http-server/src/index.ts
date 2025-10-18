import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/googlerouteHandler.js";
import urlRouter from "./routers/shortenUrl.Router.js";
import userCred from "./routers/userCredentialsRouter.js";
import collect_User_DataRouter from "./routers/collect.Router.js";
import analyticsRouter from "./routers/analytics.Router.js";
import { authMiddleware } from "./utils/middleware.js";
import cluster from "cluster";
import os from "os"; // To get the number of CPU cores

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
//   const numCPUs = os.cpus().length;

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker: any, code: any, signal: any) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
  const app = express();
  const PORT = process.env.PORT || 3001;

  dotenv.config();
  const options = cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_URL!],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(options);
  app.use("/api/auth", authRouter);
  app.use(authMiddleware);
  app.use("/user", userCred);
  app.use("/api", urlRouter);
  app.use("/api",collect_User_DataRouter);
  app.use("/api/analytics", analyticsRouter);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
// }
