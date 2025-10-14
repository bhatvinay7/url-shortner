'use client'
import { motion } from "framer-motion";
import React from 'react'

export default function ErrorPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(230_35%_8%)] text-[hsl(210_20%_98%)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_hsl(230_60%_10%)_0%,_hsl(260_50%_15%)_100%)]" />

      {/* Decorative circles */}
      <div className="absolute -left-20 -top-20 w-[25rem] h-[25rem] rounded-full bg-[hsl(270_80%_60%)] blur-[100px] opacity-20" />
      <div className="absolute -bottom-40 -right-20 w-[35rem] h-[35rem] rounded-full bg-[hsl(200_90%_50%)] blur-[120px] opacity-10" />

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center"
      >
        <h1 className="text-[clamp(3rem,10vw,6rem)] font-extrabold leading-tight text-[hsl(210_100%_97%)]">
          404
        </h1>
        <p className="mt-4 text-lg text-[hsl(210_15%_85%)]">
          Oops — the page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-xl border border-[hsl(190_95%_60%)] bg-[hsl(190_95%_56%)]/10 px-6 py-3 text-[hsl(190_95%_70%)] font-medium hover:bg-[hsl(190_95%_56%)] hover:text-[hsl(230_35%_8%)] transition"
        >
          Go Back Home
        </a>
      </motion.div>
    </main>
  )
}



