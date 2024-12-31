'use client'
import Navbar from "@/components/Navbar";
import { motion } from "motion/react";
import Link from "next/link";

export default function Page(){
  return(
    <>
    <Navbar />
    <div className="bg-transparent w-full h-screen flex justify-center items-center flex-col gap-10" >
      <motion.div
      initial={{ y: "-40%", opacity: 0 }}
      animate={{ y: "0%", opacity:1 }}
      transition={{ duration: 0.8 }}
      className="w-full flex justify-center items-center flex-col gap-2" >
        <h1 className="flex gap-2 text-4xl font-semibold bg-gradient-to-b from-slate-50 to-zinc-300 bg-clip-text text-transparent" >Collaborate and <p className="uppercase bg-gradient-to-r from-rose-500 to-violet-700 bg-clip-text text-transparent">Learn</p> the way, you always wanted to</h1>
        <h3 className="text-zinc-600" >~ with Learnify</h3>
      </motion.div>
      <div className="flex gap-10" >
        <Link className="w-40 bg-zinc-800 h-12 rounded-lg flex justify-center items-center" href={'/home'} >Explore more </Link>
        <Link className="w-40 bg-zinc-100 h-12 rounded-lg text-zinc-900 flex justify-center items-center" href={'/register'}>Register</Link>
      </div>
    </div>
    </>
  )
}