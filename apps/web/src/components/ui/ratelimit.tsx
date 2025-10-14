"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RateLimitError({time,isRatelimited}:{time:number,isRatelimited:boolean}) {
  const [seconds, setSeconds] = useState(time||300); // 5 minutes = 300s

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  // Convert to mm:ss format
const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };
 if(!isRatelimited){
    return <></>
 }
  return (
   
    <main className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(230_35%_8%)] text-[hsl(210_20%_98%)]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_hsl(230_60%_10%)_0%,_hsl(260_50%_15%)_100%)]" />

      {/* Glow circles */}
      <div className="absolute -left-24 -top-24 w-[26rem] h-[26rem] rounded-full bg-[hsl(270_80%_60%)] blur-[100px] opacity-20" />
      <div className="absolute -bottom-40 -right-28 w-[35rem] h-[35rem] rounded-full bg-[hsl(200_90%_50%)] blur-[120px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center p-6 max-w-lg rounded-2xl border border-white/10 backdrop-blur-md bg-white/5"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold text-[hsl(192,7%,14%)]"
        >
          Too Many Requests
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-[hsl(210_15%_85%)]"
        >
          You’ve hit the rate limit. Please try again after:
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-5xl font-mono font-semibold text-[hsl(192,5%,20%)]"
        >
          {formatTime(seconds)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <a
            href="/"
            className="inline-block rounded-xl border border-[hsla(200,2%,31%,0)] bg-[hsl(190_95%_56%)]/10 px-6 py-3 text-[hsl(180,9%,79%)] font-medium hover:bg-[hsl(180,1%,25%)] hover:text-[hsl(228,4%,76%)] transition"
          >
            Back to Home
          </a>
        </motion.div>
      </motion.div>
    </main>
        
  );
}
