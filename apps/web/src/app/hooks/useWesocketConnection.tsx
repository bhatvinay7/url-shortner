"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { userInfo } from "../../lib/redux/featuresSlice/userDetails";
interface UseWebSocketOptions {
  url: string;
  retryDelay?: number; // in ms
  maxRetries?: number;
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export function useWebSocket({
  url,
  retryDelay = 2000,
  maxRetries = 5,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const [connected, setConnected] = useState(false);
  const { userId, token } = useSelector(userInfo);

  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("userId", userId!);
    localStorage.setItem("token", token!);
  }

  const connect = useCallback(() => {
    if (socketRef.current) {
      return;
    }
    if (retryCountRef?.current > maxRetries && !userId) {
      return;
    }
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        setInterval(() => {
          socketRef?.current?.send(
            JSON.stringify({
              userId: localStorage.getItem("userId") || "",
              token: localStorage.getItem("token") || "",
            })
          );
        }, 10000);

        retryCountRef.current = 0;
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch {
        console.warn("Non-JSON message:", event.data);
      }
    };

    ws.onclose = () => {
      console.warn("WebSocket disconnected");
      setConnected(false);
      onClose?.();
      socketRef.current = null;

      if (retryCountRef.current < maxRetries) {
        const delay = retryDelay * Math.pow(2, retryCountRef.current); // exponential backoff
        console.log(`Reconnecting ...`);
        retryCountRef.current++;
        setTimeout(connect, delay);
      } else {
        console.error("Max retries reached reload the page");
      }
    };

    ws.onerror = (err) => {
      console?.error("WebSocket error", err);
      onError?.(err);
      ws.close();
    };
  }, [retryDelay, maxRetries, url, userId]);

  const sendMessage = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected, message not sent");
    }
  };

  useEffect(() => {
    if (socketRef.current) return;
    if (retryCountRef?.current < maxRetries && !connected) {
      connect();
    } else {
      return;
    }

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [connect]);

  return { connected, sendMessage };
}
