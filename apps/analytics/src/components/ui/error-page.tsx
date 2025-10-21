"use client";
import { motion } from "framer-motion";
import React from "react";

export default function ErrorPage() {
  return (
    <main className=" relative flex h-screen flex-col items-center justify-center bg-[hsl(225,10%,77%)] text-[hsl(210,4%,10%)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_hsl(225_60%_770%)_0%,_hsl(225_10%_77%)_100%)]" />

      {/* Decorative circles */}
      <div className="absolute -left-20 -top-20 w-[25rem] h-[25rem] rounded-full bg-[hsl(270,1%,64%)] blur-[100px] opacity-20" />
      <div className="absolute -bottom-40 -right-20 w-[35rem] h-[35rem] rounded-full bg-[hsl(0,0%,90%)] blur-[120px] opacity-10" />

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center"
      >
        <p className="mt-4 text-lg text-[hsl(0,83%,57%)]">
          Oops — error ocured.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-xl border border-[hsl(189,14%,90%)] bg-[hsl(67,90%,49%)] px-6 py-3 text-[hsl(210,4%,11%)] font-medium hover:bg-[hsla(54,86%,49%,1)] hover:text-[hsl(230_35%_8%)] transition"
        >
          Go Back Home
        </a>
      </motion.div>
    </main>
  );
}
