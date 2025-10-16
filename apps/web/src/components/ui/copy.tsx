"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardIcon, CheckIcon } from "lucide-react";

interface CopyTextProps {
  text: string;
}

export default function CopyText({ text }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Hide after 1.5s
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        arial-label="Copy to clipboard"
        title="Copy to clipboard"
        onClick={handleCopy}
        className="flex items-center gap-2 p-1.5 bg-yellow-200 rounded-md hover:bg-gray-300 transition"
      >
        <ClipboardIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -25 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 -translate-x-1/2 bg-amber-200 text-black/75 px-3 py-1 rounded-md text-sm shadow-md"
          >
            <CheckIcon className="w-4 h-4 text-black/75 inline-block mr-1" />{" "}
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
