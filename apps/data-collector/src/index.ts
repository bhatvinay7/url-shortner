import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cluster from "cluster";
import os from "os"; // To get the number of CPU cores
const port = 3012;
import { consumeFromQueue } from "./rabbitmq-consumer.js";
// created the rabbitmq package to handle the mesage
const topic = process.env.TOPIC1!;
const exchange = process.env.EXCHANGE_NAME1!;
const binding_key = process.env.BINDING_KEY1!;
const queueName = process.env.QUEUE_NAME1!;

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
  try {
    (async () => {
      await consumeFromQueue(topic, exchange, binding_key, queueName);
    })();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log("Consumer collector running on port ${port}");
  });
// }
