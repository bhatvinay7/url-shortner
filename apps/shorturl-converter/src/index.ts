import express from "express";
import { consumeFromQueue } from "./utils/shorturl-converter.js";
import dotenv from "dotenv";
dotenv.config();
import cluster from "cluster";
import os from "os"; // To get the number of CPU cores
const app = express();
const port = 3011;
const topic = process.env.TOPIC2!;
const exchange = process.env.EXCHANGE_NAME2!;
const binding_key = process.env.BINDING_KEY2!;
const queueName = process.env.QUEUE_NAME2!;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker: any, code: any, signal: any) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  try {
    (async () => {
      try {
        await consumeFromQueue(topic, exchange, binding_key, queueName);
      } catch (error) {
        console.error("Error consuming from queue:", error);
      }
    })();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
}
