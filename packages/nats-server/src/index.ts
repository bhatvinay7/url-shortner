import { connect, StringCodec } from "nats";
const natsConnection = await connect({ servers: "nats-server:4222",user: "nats",
  pass: "nats-password" });
const sc = StringCodec();
const notifyChannel = natsConnection.subscribe("url-status");
const channel= natsConnection.subscribe("push-url")

export {natsConnection,channel,notifyChannel,sc}