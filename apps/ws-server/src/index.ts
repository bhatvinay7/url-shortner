import WebSocket, { WebSocketServer } from "ws";
import express, { Request } from "express";
import http from "http";
import { message } from "types";
import userVerify from "./userAuth.js";
import { channal, notifyChannal, sc } from "nats-server";
import cookieParser from "cookie-parser";
const heartbeatInterval = 30 * 1000;
const heartbeatTimeout = 40 * 1000;
const app = express();
const port = 8080;

// Create a single HTTP server
app.use(cookieParser());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clientTimers = new Map<WebSocket, NodeJS.Timeout>();

const users = new Map<string, WebSocket>();
const socketMap = new Map<WebSocket, string>();
try {
  wss.on("headers", (headers, req: Request) => {
    headers.push(
      `Access-Control-Allow-Origin: ${process.env.NEXT_PUBLIC_FRONTEND_URL}`
    );
    headers.push("Access-Control-Allow-Credentials: true");
  });

  wss.on("connection", async function connection(ws: WebSocket, req: Request) {
    setupHeartbeat(ws);
    ws.on("message", async (message: string) => {
      const parsedMessage: message = JSON.parse(message);
      if (!parsedMessage?.token) {
        return;
      }
      // authenticate the user
      if (parsedMessage?.token) {
        try {
          const decoded = userVerify(
            parsedMessage?.token || req.cookies?.token || ``
          );
          // check whether use already added or not
          const user = users.get(`${parsedMessage?.userId}`);
          if (!user) {
            users.set(parsedMessage.userId!, ws);
            ws.send(JSON.stringify({ message: "connected.." }));
            socketMap.set(ws, parsedMessage.userId!);
          }
        } catch (error: any) {
          ws.close();
        }
      }
    });

    ws.on("close", () => {
      // remove the user from the Socker map and userMap and stop heatbeat
      stopHeartbeat(ws);
      const userId = socketMap.get(ws);
      if (userId) {
        users.delete(userId!);
        socketMap.delete(ws);
      }
      console.log("Client disconnected");
    });

    ws.on("error", function error(err) {
      console.error("WebSocket error:", err?.message);
    });
  });
} catch (error: any) {
  console.log(error);
}

// nats suncribers to receive the data

try {
  (async () => {
    for await (const m of notifyChannal) {
      let notifications = JSON.parse(sc.decode(m.data));
      let user = users?.get(notifications?.userId);
      if (user) user?.send(sc.decode(m.data));
    }
  })();

  (async () => {
    for await (const m of channal) {
      let data = JSON.parse(sc.decode(m.data));
      let user = users?.get(data?.userId);
      if (user) user?.send(sc.decode(m.data));
    }
  })();
} catch (error: any) {
  console.log("error " + error);
}

server.listen(port, "0.0.0.0", () => {
  console.log("WebSocket server started on port 8080");
});

function setupHeartbeat(ws: WebSocket) {
  const timer = setTimeout(() => {
    ws.close();
  }, heartbeatTimeout);
  clientTimers.set(ws, timer);
  ws.on("pong", () => {
    clearTimeout(clientTimers.get(ws)!);
    const newTimer = setTimeout(() => {
      ws.close();
    }, heartbeatTimeout);
    clientTimers.set(ws, newTimer);
  });
}

function stopHeartbeat(ws: WebSocket) {
  clearTimeout(clientTimers.get(ws)!);
  clientTimers.delete(ws);
}

setInterval(() => {
  const allSocketsArray = Array.from(users.values());
  for (const client of allSocketsArray) {
    if (client.readyState === WebSocket.OPEN) {
      client.ping();
    }
  }
}, heartbeatInterval);
