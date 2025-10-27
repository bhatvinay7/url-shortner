"use client";
import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import PopupUp from "../components/ui/signin-popup";
import Content from '../components/ui/content'
import Footer from  '../components/ui/footer'
import {get_shorten_url} from '../utils/api/generate_short_url'
import Copy from '../components/ui/copy'
import {Loader,CircleCheck} from  'lucide-react'

import {
  getUser_details,
   userInfo,
} from "../lib/redux/featuresSlice/userDetails";

import { useWebSocket } from "./hooks/useWesocketConnection";
import RateLimitError from "../components/ui/ratelimit"; 
interface progress{
    messages:string[]
}

export default function Home() {
  const dispatch = useDispatch();
  const userDetails=useSelector(userInfo)
  const inputRef = useRef<HTMLInputElement>(null); 
  const [progress,setProgress]=useState<progress>({messages:[]})
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [permission, setPermission] = useState(false);
  const [input, setInput] = useState("");
  const [popup,setPopUp]=useState(false)
  const [error, setError]=useState<{message:string}|null>(null)
  const [isRarelimited,setIsRatelimited]=useState(false)
  const [time,setTime]=useState(0)

useEffect(()=>{
    dispatch(getUser_details() as any)
    
  },[dispatch])
  
  const { connected, sendMessage } = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_SERVER_URL!,onMessage:onMessage
  });
  useEffect(() => {
  if (!inputRef.current) return;

  const handleKeyDown = () => {
    if (!userDetails?.userId) {
      setPopUp(true);
    }
  };

  const currentInput = inputRef.current;
  currentInput.addEventListener("keydown", handleKeyDown);

  return () => {
    currentInput.removeEventListener("keydown", handleKeyDown);
  };
}, [userDetails,inputRef]);

useEffect(()=>{
  
},[])


function onMessage(data:any){
  setIsLoading(false) 
  const message=data
  if(message.type=="data"){
    setShortUrl(message?.message)
  }
  if(message.type=="notification"){
     setProgress((priv)=>({messages:priv?.messages  ? [...priv?.messages ,message?.message]:[]}))
  }
  if(message.type=="error"){
    setError({message:message.message})
  }
}

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
     if(!url)return 
     setIsLoading(true) 
     setUrl("")
     setProgress({messages:[]})
     const response=await get_shorten_url(url!)
     if(response?.url){
      setShortUrl(response?.url)
     }
     setProgress((priv)=>({messages:priv?.messages  ? [...priv?.messages ,response?.message]:[]}))
    }
    catch(error:any){
    if(error?.response?.status==429){
    setIsRatelimited(true)
    setTime(error?.response?.data?.startTime)  
    setIsRatelimited(true)
      }
    }
    finally{
       setIsLoading(false)
    }
   
  };

  return (
    <main className="min-h-screen bg-[hsl(240,6%,86%)] text-[hsl(220,20%,20%)] font-[Poppins] flex flex-col items-center justify-center px-6 py-12">
      { popup &&
      <div className=" h-screen  absolute flex max-w-xl items-center justify-center ">
      <PopupUp/>
    </div>
         }

      <RateLimitError
       time={time}
       isRatelimited={isRarelimited}
       setValue={setIsRatelimited}
       
      />   
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-[hsl(212,90%,45%)] mb-2">
          Shortly
        </h1>
        <p className="text-[hsl(220,10%,45%)]">
          Shorten, manage, and share your links with ease.
        </p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-[hsl(240,7%,84%)] rounded-2xl  backdrop-blur-md p-8 flex flex-col gap-6">
        <section>
          <h2 className="text-2xl font-semibold text-[hsl(212,90%,45%)] mb-4">
            Paste your link below
          </h2>
          <form onSubmit={handleShorten} className="flex flex-col gap-3">
            <input
              ref={inputRef} 
              type="url"
              placeholder="Enter your long URL..."
              className="border border-[hsl(228,2%,43%)] focus:ring-2 focus:ring-[hsl(212,90%,45%)] outline-none text-base rounded-xl px-4 py-3 text-[hsl(220,20%,20%)]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
          
            />
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#425e7bf0] hover:bg-[hsl(212,53%,35%)] text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Shorten URL
            </button>
          </form>
         <div className="h-auto flex flex-col gap-2 space-y-1 p-1.5">

             {isLoading ?
             <div className=" w-fit p-2 mt-1 rouded-xl px-1.5 py-1 rounded-xl text-base ">
              <Loader  className="animate-spin mx-auto  absolute  w-5 h-5 text-[hsl(237,62%,63%)]"/></div>:<></> 
            }

          {progress?.messages?.map((updates:string,index:number)=>{
            return(
              <div key={index} className={` w-fit  px-2 flex  justify-between  text-base py-2 space-x-2 h-auto  text-[hsl(210,5%,15%)] ${updates ?"bg-[#dbdbe0]":"bg-transparent"} rounded-sm border border-white/15 `}>
                <div className=" flex items-center min-h-4 space-x-2 "  >
                {updates}
                </div>  

               { (updates?.includes("processing") || updates?.includes("generating")) && !shortUrl ? <Loader  className="animate-spin  w-5 h-5 text-[hsl(237,62%,63%)]"/>:<CircleCheck className=" w-6 h-6 text-[hsl(156,90%,45%)]"/>} 
               </div>
            )
          })}
          
          {shortUrl && <div className=" w-full flex items-center justify-between bg-white/75 p-1.5 rounded-md border border-black/15 gap-x-1.5">
            <div className="text-[hsl(211,48%,12%)] p-1 text-base max-w-[310px] line-clamp-1 font-medium break-all">{shortUrl}</div>
                <Copy
          text={shortUrl}
          />
          </div>
         }
          </div>
        </section>

        {/* How It Works Section */}
         
        {/* Footer */}

      </div>
       <Content/>
      <Footer/> 
    </main>
  );
}
