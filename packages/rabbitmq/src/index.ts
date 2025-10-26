import { Connection } from 'rabbitmq-client';
import dotenv from 'dotenv';
dotenv.config();

let retryAttempt = 0;
const retryLow = 1000;
const retryHigh = 30000;

function getBackoffDelay(attempt: number) {
  const delay = retryLow * 2 ** attempt;
  return Math.min(delay, retryHigh);
}

// Function to create a connection
function createConnection() {
  const connection = new Connection({
    url:process.env.RABBITMQ_CLUSTER_URL!,
    heartbeat: 90,
    connectionTimeout: 10000,
  });

  connection.on('error', (err: any) => {
    console.log('RabbitMQ connection error', err);

    const delay = getBackoffDelay(retryAttempt);
    console.log(`Retrying connection in ${delay} ms`)

    setTimeout(() => {
      retryAttempt++;        // increment attempt count
      createConnection();    // reconnect
    }, delay);
  });

  connection.on('connection', () => {
    console.log('Connection successfully (re)established');
    retryAttempt=0
  });

  return connection;
}

const connection = createConnection();
export default connection;
