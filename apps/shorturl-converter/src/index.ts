import express from "express";
const app = express();
const port = 3011;
import rabbit from "rabbitmq";
import assignTopic from "./utils/topicAssigner.js";
import topicAssignerAgent from "./utils/groq-topic-assigner-agent.js";
import generatetHash from "./utils/uniqueStringConverter.js";
import { Url, connectDB } from "mongodb";

try {
  await connectDB();
  const data = await assignTopic("");

  const sub = rabbit.createConsumer(
    {
      queue: "user-events",
      queueOptions: { durable: true },
      // handle 2 messages at a time
      qos: { prefetchCount: 2 },
      // Optionally ensure an exchange exists
      exchanges: [{ exchange: "my-events", type: "topic" }],
      // With a "topic" exchange, messages matching this pattern are routed to the queue
      queueBindings: [{ exchange: "my-events", routingKey: "users.*" }],
    },
    async (msg) => {
      console.log("received message (user-events)", msg);
      // The message is automatically acknowledged (BasicAck) when this function ends.
      // If this function throws an error, then msg is rejected (BasicNack) and
      // possibly requeued or sent to a dead-letter exchange. You can also return a
      // status code from this callback to control the ack/nack behavior
      // per-message.
    }
  );
} catch (error: any) {
  console.log(error);
}

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
