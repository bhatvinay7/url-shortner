import { Connection } from 'rabbitmq-client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

let retryAttempt = 0;
const retryLow = 1000;
const retryHigh = 30000;

function getBackoffDelay(attempt: number) {
  const delay = retryLow * 2 ** attempt;
  return Math.min(delay, retryHigh);
}

const privateKey = process.env.jwt_private_key!;
const AUTH_ISSUER = process.env.AUTH_ISSUER!;
const user = process.env.INDENTITY_KEY!;
const RABBITMQ_HOST = "rabbitmq";
const RABBITMQ_PORT = 5672;

// Function to generate a fresh token
function generateToken() {
  return jwt.sign(
    {
      sub: user,
      iss: AUTH_ISSUER,
      aud: "rabbitmq",
      exp: Math.floor(Date.now() / 1000) + 60 *60*24*2,
    },
    privateKey,
    { algorithm: 'RS256' }
  );
}

// Function to create a connection
function createConnection() {
  const token = generateToken();
  const url = `amqp://${user}:${token}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/`;

  const connection = new Connection({
    url,
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
