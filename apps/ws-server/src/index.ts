import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { message } from "types";
import userVerify from "./userAuth.js";
import { publishToQueue } from "./rabbitmq-ptoducer.js";
import { natsConnection, channel, notifyChannel, sc } from "nats-server";
const app = express();
const port = 8080;
const wss = new WebSocketServer({ port: 8080 });
const users = new Map<string, WebSocket>();
const socketMap = new Map<WebSocket, string>();
try {
  wss.on("connection", async function connection(ws) {
    ws.on("message", async (message: string) => {
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

          await publishToQueue(
            message,
            "topic",
            "user-metrics",
            2,
            "data.collector"
          );
        } catch (error: any) {}

        const wss = users.get(`${parsedMessage?.userId}`);
        if (!wss) {
          users.set(parsedMessage.userId!, ws);
          socketMap.set(ws, parsedMessage.userId!);
        }
      }
      // nats suncribers to receive the data
    });

    try {
      (async () => {
        for await (const m of notifyChannel) {
          let notifications = JSON.parse(sc.decode(m.data));
          let user = users.get(notifications?.userId);
          if(user)user?.send(notifications);
          console.log("notifications:-" + notifications);
        }
      })();

      (async () => {
        for await (const m of channel) {
          let data = JSON.parse(sc.decode(m.data));
          let user = users.get(data?.userId);
          if(user)user?.send(data);
          console.log("data:-" + data);
        }
      })();
    } catch (error: any) {
      console.log("error " + error);
    }

    ws.on("close", (ws: WebSocket) => {
      // remove the user from the Socker map and userMap
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
