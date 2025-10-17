import connection from "rabbitmq";
import { ConsumerStatus } from "rabbitmq-client";
import {
  Devicedata,
  connectDB,
  deviceType,
  permissions,
  OSType,
} from "mongodb";
let sub: any = null;
export async function consumeFromQueue(
  topic: string,
  exhangeName: string,
  routingKey: string,
  queueName: string
) {
  await connection.onConnect(120, true);
  sub = connection.createConsumer(
    {
      queue: queueName,
      queueOptions: { durable: true },
      qos: { prefetchCount: 1 },
      exchanges: [{ exchange: `${exhangeName}`, type: `${topic}` }],
      queueBindings: [
        { exchange: `${exhangeName}`, routingKey: `${routingKey}` },
      ],
    },
    async (message) => {
      try {
        const deviceData = JSON.parse(message.body.toString("utf8"));
        console.log(
          "received message (user-events)",
          message.body.toString("utf8")
        );
        const permissionState=deviceData.permissions.geolocation.geolocationPermission
        const data=deviceData.osType.toUpperCase()      
        const device_Type=deviceData.deviceType.toUpperCase()    
                  try {
          await connectDB();

          await Devicedata.create({
            osType: OSType[data as keyof typeof OSType],
            deviceType: deviceType[device_Type as keyof typeof deviceType],
            timezone: deviceData.timezone,
            geolocation: {
              type: "Point",
              coordinates: [
                deviceData.geolocation?.longitude,
                deviceData.geolocation?.latitude,
              ],
            },
            permissions: {
              geolocation:
                permissions[permissionState as keyof typeof permissions]
            },
            timestamp: deviceData.timestamp,
            ip: deviceData.ip,
            userId: deviceData.userId,
          });
          ConsumerStatus.ACK;
        } catch (error: any) {
          return 1;
        }
      } catch (error: any) {
        return 1;
      }
    }
  );
}
export async function onShutdown() {
  await sub.close();
  await connection.close();
}
process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown);
