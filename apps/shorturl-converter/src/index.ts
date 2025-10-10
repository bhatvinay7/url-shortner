import express from "express";
import {consumeFromQueue} from "./utils/shorturl-converter.js";
const app = express();
const port = 3011;

(async () => {
  try {
   await consumeFromQueue("topic", "url-metrics", "push.*", "push-url");
  } catch (error) {
    console.error("Error consuming from queue:", error);
  }
  
})()

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);

});