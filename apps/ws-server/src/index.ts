import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { message } from "types";
import userVerify from "./userAuth.js";
import rabbit from "rabbitmq";
const app = express();
const port = 8080;
const wss = new WebSocketServer({ port: 8080 });
const users = new Map<string, WebSocket>();
const socketMap = new Map<WebSocket, string>();
try {
  wss.on("connection", function connection(ws) {
    ws.on("message", (message: string) => {
      const parsedMessage: message = JSON.parse(message);
      if (!parsedMessage?.token) {
        return;
      }
      if (parsedMessage?.token) {
        // authenticate the user
        try {
          const decoded = userVerify(parsedMessage?.token);
          if (decoded?.userId != parsedMessage?.userId) {
            return;
          }
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
              ws.send(JSON.stringify({ message: "user is not authorized " }));
            }
          );
        } catch (error: any) {}

        const wss = users.get(`${parsedMessage?.userId}`);
        if (!wss) {
          users.set(parsedMessage.userId, ws);
          socketMap.set(ws, parsedMessage.userId);
        }
      }
      ws.send(`Server received: ${message}`);
    });

    ws.on("close", (ws: WebSocket) => {
      const userId = socketMap.get(ws);
      const wsInstance = users.get(userId!);
      if (userId && wsInstance) {
        users.delete(userId!);
        socketMap.delete(wsInstance!);
      }
      console.log("Client disconnected");
    });

    ws.on("error", function error(err) {
      console.error("WebSocket error:", err);
    });

    ws.send("Welcome to the WebSocket server!");
  });
} catch (error: any) {
  console.log(error);
}
app.listen(port, "0.0.0.0", () => {
  console.log("WebSocket server started on port 8080");
});
