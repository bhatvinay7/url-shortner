import { connect, StringCodec } from "nats";
const natsConnection = await connect({ servers: "nats-server:4222",user: "nats",
  pass: "nats-password" });
const sc = StringCodec();
const channel = natsConnection.subscribe("url-status");
const notifyChannel= natsConnection.subscribe("push-url")
// (async () => {
//   for await (const m of sub) {
//     console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
//   }
//   console.log("subscription closed");
// })();
export {natsConnection,channel,notifyChannel,sc}