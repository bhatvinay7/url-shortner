"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {X} from 'lucide-react'
export default function RateLimitError({time,isRatelimited,setValue}:{time:number,isRatelimited:boolean,setValue:React.Dispatch<React.SetStateAction<boolean>>}) {
const [seconds, setSeconds] = useState(0); // 5 minutes = 300s


  useEffect(() => {
    if(time>0){
      setSeconds(300 - time);

    }
}, [time]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) =>( s>0? s - 1:0)), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

 
const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60)?.toFixed(0)
    return `${parseInt(m)>0 ?m:0}:${parseInt(sec)>0?sec:0}`;
  };
 if(!isRatelimited || !time){
    return <></>
 }
  return (
   
    <main className=" w-fit flex  fixed top-5 z-[34] h-auto rounded-md  sm:right-5   flex-col items-center justify-center overflow-hidden  text-[hsl(210_20%_98%)] ">
      <X onClick={()=>setValue(!isRatelimited)} className="absolute right-2 topo-1 text-black w-5 h-5 hover:text-red-500"/>
      {/* Gradient background */}
      <div className=" absolute rounded-md inset-0 bg-[linear-gradient(135deg,_hsl(230_60%_10%)_0%,_hsl(260_50%_15%)_100%)] " />

      {/* Glow circles */}
      <div className="absolute  -top-18 w-[20rem] h-[20rem] rounded-md bg-[hsl(268,9%,30%)] blur-[100px] opacity-20" />
      <div className="absolute -bottom-40  -right-28 w-[32rem] h-[14rem] rounded-md bg-[hsl(200,3%,65%)] blur-[120px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center p-4 max-w-lg rounded-md border border-white/10 backdrop-blur-md bg-white/5"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[clamp(2rem,6vw,1rem)]  font-extrabold text-[hsl(195,23%,90%)]"
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
          className="mt-6 text-xl font-mono font-semibold text-[hsl(192,26%,93%)]"
        >
          {formatTime(seconds)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
        </motion.div>
      </motion.div>
    </main>
        
  );
}
