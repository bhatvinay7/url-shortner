import { connect, StringCodec } from "nats";
import dotenv from "dotenv";
dotenv.config();

async function createNataConnection() {
 
    const natsConnection = await connect({
      servers: process.env.servers!,
      user: process.env.user!,
      pass: process.env.pass!,
    });
    const sc = StringCodec();
    const notifyChannal = natsConnection.subscribe(process.env.URL_STATUS!);
    const channal = natsConnection.subscribe(process.env.URL_CHANNAL!);
    return { natsConnection, channal, notifyChannal, sc };
}


const { natsConnection, channal, notifyChannal, sc } =await createNataConnection();

export { natsConnection, channal, notifyChannal, sc };
