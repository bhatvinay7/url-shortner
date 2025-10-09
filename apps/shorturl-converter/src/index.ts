import express from "express";
import {consumeFromQueue} from "rabbitmq";
const app = express();
const port = 3011;

try {
  
  await consumeFromQueue("url-metric","exchange","url.*","url-push")

} catch (error: any) {
  console.log(error);
}

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
