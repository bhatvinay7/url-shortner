import rabbit from "rabbitmq";
const sub = rabbit.createConsumer(
  {
    queue: "user-events",
    queueOptions: { durable: true },
    // handle 2 messages at a time
    qos: { prefetchCount: 2 },
    // Optionally ensure an exchange exists
    exchanges: [{ exchange: "my-events", type: "topic" }],
    // With a "topic" exchange, messages matching this pattern are routed to the queue
    queueBindings: [{ exchange: "my-events", routingKey: "users.*" }],
  },
  async (msg) => {
    console.log("received message (user-events)", msg);
    // The message is automatically acknowledged (BasicAck) when this function ends.
    // If this function throws an error, then msg is rejected (BasicNack) and
    // possibly requeued or sent to a dead-letter exchange. You can also return a
    // status code from this callback to control the ack/nack behavior
    // per-message.
  }
);
