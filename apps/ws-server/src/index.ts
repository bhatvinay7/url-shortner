import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { userData } from "types";
import userVerify from './userAuth'
const app = express();
const port = 8080;
const wss = new WebSocketServer({ port: 8080 });
const users = new Map<string, WebSocket>();
const socketMap = new Map<WebSocket, string>();
try {
  wss.on("connection", function connection(ws) {
    ws.on("message", (message: string) => {
      const parsedMessage: userData = JSON.parse(message);
      if (!parsedMessage?.token) {
        return;
      }
      if (parsedMessage?.token) {
        // authenticate the user
        try{
          const decoded=userVerify(parsedMessage?.token)
          if(decoded?.userId!=parsedMessage?.userId)
            return
        }catch(error:any){
          ws.send(JSON.stringify({message:"user is not authorized "}))
        }

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
