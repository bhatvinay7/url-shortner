import connection from "rabbitmq";
import { ConsumerStatus } from "rabbitmq-client";
import mongoose from "mongoose";
import { ClientInfo } from "types";
import {
  Devicedata,
  connectDB,
  deviceType,
  permissions,
  OSType,
} from "mongodb";
let sub: any = null;

type Permission = {
  geolocation: string;
 
};

export async function consumeFromQueue(
  topic: string,
  exhangeName: string,
  routingKey: string,
  queueName: string
) {
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
        if (message) {
          const deviceData: ClientInfo = JSON.parse(
            message.body.toString("utf8")
          );
          const permissionState = (deviceData.permission as Permission).geolocation;
          const data = (deviceData.osType as string).toUpperCase();
          const device_Type = (deviceData?.deviceType as string).toUpperCase();
          try {
            await connectDB();

            await Devicedata.create({
              osType: OSType[data as keyof typeof OSType]!,
              deviceType: deviceType[device_Type as keyof typeof deviceType]!,
              timeZone: deviceData?.timeZone!,
              deviceName: deviceData?.deviceName!,
              urlId: deviceData?.urlId,
              osName:deviceData.osName,
              geolocation: {
                type: "Point",
                coordinates: [
                  deviceData.geolocation?.longitude,
                  deviceData.geolocation?.latitude,
                ],
              },
              permission: {
                geolocation:
                  permissions[permissionState as keyof typeof permissions],
              },
              createdAt: Date.now(),
              userIp: deviceData?.userIp!,
              userId: deviceData?.userId!,
            });
            return ConsumerStatus.ACK;
          } catch (error: any) {
            console.log(error);
          }
        }
      } catch (error: any) {
        console.log(error);
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
