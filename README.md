# 🌐 URL Shortener Platform — Monorepo

A **distributed, AI-driven URL Shortener** built with a **microservice architecture**, designed for **real-time analytics, scalability, and fault tolerance**.  
This monorepo follows a modular structure with shared configuration, type definitions, and service-level isolation.
---
## 🧭 Overview

The platform allows users to:
- Generate short URLs using an AI-based topic classifier.
- Monitor analytics in real time (via WebSocket).
- Collect device and location-based data upon redirection.
- Support multiple brokers and fault-tolerant messaging (RabbitMQ & NATS).

---
# 🏗️ System Architecture — URL Shortener Platform

This document provides a detailed overview of the system architecture for the URL Shortener monorepo.
<img width="1335" height="662" alt="image" src="https://github.com/user-attachments/assets/2d1a6846-8675-4767-882f-34acd7f953fc" />


### Core Components
- HTTP Server — Auth, Rate Limiting, Analytics  
- ShortURL Converter — AI + Hashing Engine  
- Data Collector — User analytics  
- WebSocket Server — Real-time updates  
- RabbitMQ + NATS — Messaging backbone  
- MongoDB — Persistent storage
---

## ⚙️ Discussion — Scalability

Scalability in this platform is achieved through a combination of **horizontal service scaling**, **message-based communication**, and **stateless design principles**. Each component can scale independently without creating tight coupling between services.

### 1. Horizontal Scaling of Services
- **HTTP Server:** Stateless by design — multiple instances can run behind an Nginx or Azure Load Balancer.
- **WebSocket Server:** Each node manages its own connected clients. User-to-server mapping is stored in **Redis**, allowing global message routing without shared memory.
- **ShortURL Converter & Data Collector:** Can scale independently as worker services. Additional instances subscribe to the same RabbitMQ/NATS subjects for load balancing.

### 2. Redis as a Routing Registry
- Redis stores mappings of `userId → serverId` and `serverId → connectionCount`.
- When a user connects, the WebSocket server registers its ID in Redis with a TTL.
- If the server goes down, the TTL expires, automatically cleaning up stale mappings.
- This mechanism enables **O(1)** lookups for user routing across distributed WebSocket nodes.

---

## Overview
This architecture uses:
* Each WebSocket server generates a unique ID and registers it in a registry
* When a user connects, we store `userId → serverId`
* NATS sends messages only to the server channel that user belongs to

---


```js
const serverId = generateServerId(); // e.g. ws-23adfa
registry.register(serverId); // store in Redis or NATS registry
nats.subscribe(`ws.${serverId}`, onMessage);
```

This ensures each WebSocket server has a private NATS subject/channel:

```
ws.ws-23adfa
ws.ws-983abc
ws.ws-45bcd1
```

Each one listens only to its own messages.

---

## User Connects

When a user connects to any WebSocket server:

```js
redis.set(`user:${userId}`, serverId);
```

(Optionally with an expiry or heartbeat.)

This creates a routing map:

```
user:1001 → ws-23adfa
user:1002 → ws-983abc
user:1003 → ws-23adfa
```

---

## Send Message to User

When any service wants to send a message to a specific user:

**Lookup:**

```js
const serverId = await redis.get(`user:${userId}`);
```

**Publish message:**

```js
nats.publish(`ws.${serverId}`, { userId, message });
```

✅ Only one server receives the message  
✅ No unnecessary broadcast traffic  
✅ Scales linearly with the number of WebSocket servers

---

## Sending to a Channel (Group / Room)

If you have group chats, add another layer:

```sql
room:gaming → [user:1001, user:1003, user:1005]
```

When publishing:

1. Loop over users in that room
2. Fetch their serverId
3. Batch them by server
4. Then send one NATS message per server

**Example:**

```js
nats.publish(`ws.${serverId}`, { roomId, message, userIds });
```

✅ Each WebSocket server broadcasts locally to its connected users  
✅ Greatly reduces NATS traffic for large groups

---


```js
onUserConnected(userId) {
  redis.set(`user:${userId}`, serverId, 'EX', 60);
}
```

### Message Publish (from any microservice)

```js
const serverId = await redis.get(`user:${userId}`);
if (serverId) {
  nats.publish(`ws.${serverId}`, JSON.stringify({ userId, message }));
}
```

### 3. NATS for Distributed Messaging
- NATS acts as the **message fabric** between all WebSocket servers and microservices.
- Messages are published on dynamic subjects like `ws.<serverId>` or `user.<userId>`.
- Only the corresponding WebSocket server node receives and forwards messages, eliminating unnecessary fan-out.
- With NATS clustering, throughput scales linearly with the number of nodes, supporting **millions of messages per second**.

### 4. RabbitMQ for Reliable Workflows
- RabbitMQ handles background workflows such as URL analytics ingestion and short URL generation.
- Queues are load-balanced — multiple consumer replicas can process messages concurrently.
- Persistent message queues guarantee delivery even under heavy load or temporary outages.


### 5. Fault Tolerance and Recovery
- Each WebSocket server sends periodic heartbeats to Redis or NATS.
- If a node becomes unresponsive, other nodes automatically reroute messages using updated registry mappings.
- Stateless containers ensure quick recovery — new nodes can join the cluster within seconds.

### 6. Bottlenecks & Mitigation
| Potential Bottleneck | Description | Mitigation Strategy |
|----------------------|--------------|----------------------|
| Redis single-node limits | High connection churn | Enable Redis Cluster or use sharding |
| NATS fan-out pressure | Large broadcast channels | Use subject partitioning (per-channel) |
| RabbitMQ queue backlog | Spikes in data events | Enable quorum queues and auto-scaling consumers |
| WebSocket node imbalance | Uneven user distribution | Hash-based user assignment to nearest node |

### 8. Scaling Pattern Summary
| Layer | Scaling Strategy | Technology |
|-------|------------------|-------------|
| API Layer | Stateless replicas behind LB | Nginx / Azure LB |
| WebSocket Layer | Redis registry + NATS subjects | Redis, NATS |
| Worker Layer | Queue-based parallelism | RabbitMQ |
| Storage Layer | Sharding and caching | MongoDB, Redis |

### ✅ Result
This architecture ensures:
- Seamless horizontal scaling at every layer  
- Low latency (<50ms inter-node communication)  
- Automatic fault recovery  
- Predictable performance under high concurrent user load


## 📁 Monorepo Structure
<img width="707" height="703" alt="image" src="https://github.com/user-attachments/assets/05c63c7d-8605-4264-aabe-bffaceba524a" />

## ⚙️ Services and Ports

| Service | Description | Port |
|----------|-------------|------|
| 🟨 **Client (web)** | Frontend app for URL management | `3000` |
| 🟨 **Client (web-analytics)** | Frontend app for URL analytics management | `3006` |
| 🟩 **HTTP Server (api)** | Core backend server for auth, rate-limit, and URL ops | `3001` |
| 🟪 **WebSocket Server** | Real-time status and event updates | `8080` |
| 🟩 **ShortURL Converter** | AI-enhanced shortener using scraping & categorization | `3011` |
| 🟩 **Data Collector** | Tracks redirect analytics and user info | `3012` |
| 🟦 **NATS Server** | Lightweight message bus for status broadcasting | `4222` |
| 🟦 **RabbitMQ Cluster** | 2 brokers (SSL-enabled):<br>• Broker 1 → ShortURL info<br>• Broker 2 → User data | `5671` |

---

## 🧱 HTTP Server Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `{host}/api/user_login` | `POST` | Register a new user |
| `{host}/user/api/getCredentials` | `POST` | get a user details |
| `{host}/auth/google` | `GET` | OAuth2 Google authentication |
| `${host}/api/collectData/alias` | `GET` | collect the userdata |
| `${host}/api/redirect/${hash}` | `GET` | redirect url |
| `${host}/api/shorten_url',{url}` | `POST` | Create a short URL |
| `${host}/api/analytics/overallAnalytics` | `GET` | Fetch overall analytics |
| `${host}/api/analytics/url/${urlId}` | `GET` | Fetch  analytics for a perticular url |
| `${host}/api/analytics/topic/${topic}` | `GET` | Get topic-wise analytics |
| `${host}/api/analytics/getUrls` | `GET` | List top 10 URLs by clicks |
| — | Middleware | JWT auth, Redis rate limiter |

---

## 🧠 ShortURL Converter

- Hashes long URLs into compact short IDs  
- Uses AI to **scrape and analyze web content**  
- Assigns a **topic/category** for analytics  
- Publishes data to RabbitMQ (`url-metric exchange`)  
- Stores short URL + metadata in **MongoDB**

---

## 📊 Data Collector Service

- Listens to redirect events  
- Extracts user metadata:
  - Location 🌍  
  - OS / Device type 💻  
  - Browser / Platform 📱  
- Sends analytics data to **RabbitMQ Broker 2**  
- Persists to **MongoDB**

---

## 🐇 RabbitMQ Cluster

| Broker | Responsibility | SSL | Port |
|---------|----------------|------|------|
| Broker 1 | Collect short URL & topic info | ✅ | `5671` |
| Broker 2 | Collect user analytics data | ✅ | `5671` |

Cluster is configured with:
- TLS certificates (`CA_CERTIFICATE`, `SERVER_CERTIFICATE`, `SERVER_KEY`)
- Persistent exchanges for `topic1`, `topic2`
- Fanout and direct routing keys for `url-metric` and `user-metric` queues

---

## 🔄 CI/CD Pipeline

### 🧩 **CI (Continuous Integration)** — *GitHub Actions*
Triggered on every push or PR:
1. Install dependencies using **pnpm**
2. Run **linting** and **type-checks**
3. Build all apps via **Turborepo**
4. Generate `env` file for local development:
   ```bash
   USER="user"
   PASS="password"
   NEXT_PUBLIC_BACKEND_URL="https://localhost:3001"
   NEXT_PUBLIC_FRONTEND_URL="https://localhost:3000"
   NEXT_PUBLIC_ANALYTICS_FRONTEND_URL=="https://localhost:3006"
   NEXT_PUBLIC_WS_SERVER_URL=="https://localhost:8080"
   GOOGLE_CLIENT_ID 
   GOOGLE_CLIENT_SECRET
   GOOGLE_REDIRECT_URI
   API_KEY
   groq_api_key
   access_ke
   secret_key
   RABBITMQ_CLUSTER_URL="amqp://user:password@localhost:5672"
   TOPIC1=topic
   EXCHANGE_NAME1="user-metrics"
   BINDING_KEY1="data.*"
   ROUTING_KEY1="data.collector"
   QUEUE_NAME1="data-collector"
   TOPIC2="topic"
   EXCHANGE_NAME2="url-metrics"
   BINDING_KEY2="url.*"
   ROUTING_KEY2="url.data"
   QUEUE_NAME2="url-collector"
   URL_CHANNAL="url-push"
   URL_STATUS="url-notification"
   user="user"
   pass="password"
   servers="natsserver:4222"
   # From redis.io
   REDIS_PASSWORD
   REDIS_PORT
   REDIS_HOST
   # MongoDB URL
   DB_URL
   # For production only
   CA_CERTIFICATE
   SERVER_KEY
   SERVER_CERTIFICATE
  
