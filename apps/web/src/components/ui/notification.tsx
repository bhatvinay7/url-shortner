'use client'
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import {NotificationProps} from 'types'
enum state { 
  SUCCESS="success",
  FAILURE="failure"
}
const Notification= ({ message, type, show, onClose }:NotificationProps ) => {
  const baseClasses = "min-w-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border";
  const typeClasses =
    type === state?.SUCCESS
      ? "bg-blue-50 border-blue-300 text-black"
      : "bg-red-100 border-red-300 text-red-700";

  return (
    <AnimatePresence>
      {show && message ?(
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`${baseClasses} ${typeClasses}`}
        >
          {type === "success" ? (
            <CheckCircle className="w-5 h-5 text-blue-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <span className="text-sm font-medium flex-1">{message}</span>

          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              ✕
            </button>
          )}
        </motion.div>
      ):<></>}
    </AnimatePresence>
  );
};

export default Notification;
