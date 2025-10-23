import { connect, StringCodec } from "nats";
import dotenv from "dotenv"
dotenv.conf()
const natsConnection = await connect({ servers: process.env.servers,user: process.env.user,
pass: process.env.pass });
const sc = StringCodec();
const notifyChannal = natsConnection.subscribe(process.env.URL_STATUS);
const channal= natsConnection.subscribe(process.env.URL_CHANNAL)

export {natsConnection,channal,notifyChannal,sc}