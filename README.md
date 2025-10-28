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

## 📁 Monorepo Structure
<img width="707" height="703" alt="image" src="https://github.com/user-attachments/assets/05c63c7d-8605-4264-aabe-bffaceba524a" />
---
## ⚙️ Services and Ports

| Service | Description | Port |
|----------|-------------|------|
| 🟨 **Client (web)** | Frontend app for URL management | `3000` |
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
| `/user/create` | `POST` | Register a new user |
| `/auth/google` | `GET` | OAuth2 Google authentication |
| `/shorten` | `POST` | Create a short URL |
| `/analytics/overall` | `GET` | Fetch overall analytics |
| `/analytics/topic` | `GET` | Get topic-wise analytics |
| `/analytics/top10` | `GET` | List top 10 URLs by clicks |
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
4. Generate `env.compose` dynamically from GitHub Secrets:
   ```bash
   USER
   PASS
   NEXT_PUBLIC_BACKEND_URL
   NEXT_PUBLIC_FRONTEND_URL
   NEXT_PUBLIC_ANALYTICS_FRONTEND_URL
   NEXT_PUBLIC_WS_SERVER_URL
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GOOGLE_REDIRECT_URI
   API_KEY
   groq_api_key
   access_ke
   secret_key
   RABBITMQ_CLUSTER_URL
   DB_URL
   TOPIC1
   EXCHANGE_NAME1
   BINDING_KEY1
   ROUTING_KEY1
   QUEUE_NAME1
   TOPIC2
   EXCHANGE_NAME2
   BINDING_KEY2
   ROUTING_KEY2
   QUEUE_NAME2
   URL_CHANNAL
   URL_STATUS
   user
   pass
   servers
   CA_CERTIFICATE
   SERVER_KEY
   SERVER_CERTIFICATE
   REDIS_PASSWORD
   REDIS_PORT
   REDIS_HOST
