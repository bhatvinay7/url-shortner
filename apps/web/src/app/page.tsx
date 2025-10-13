"use client";
import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import PopupUp from "../components/ui/signin-popup";
import Content from '../components/ui/content'
import Footer from  '../components/ui/footer'
import {get_shorten_url} from '../utils/api/generate_short_url'
import {
  getUser_details,
   userInfo,
} from "../lib/redux/featuresSlice/userDetails";

import { useWebSocket } from "./hooks/useWesocketConnection";

interface progress{
    messages:string[]
}

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
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


  useEffect(()=>{
    dispatch(getUser_details() as any)
    
  },[dispatch])
  
  const { connected, sendMessage } = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_SERVER_URL!,onMessage:onMessage
  });
  useEffect(() => {
  if (!inputRef.current) return;

  const handleKeyDown = () => {
    if (!userDetails) {
      setPopUp(true);
    }
  };

  const currentInput = inputRef.current;
  currentInput.addEventListener("keydown", handleKeyDown);

  return () => {
    currentInput.removeEventListener("keydown", handleKeyDown);
  };
}, [userDetails]);

useEffect(()=>{
  
},[])


function onMessage(data:any){
  const message=JSON.parse(data)
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
     const response=await get_shorten_url(url!)
     setProgress((priv)=>({messages:priv?.messages  ? [...priv?.messages ,response?.message]:[]}))
    }
    catch(error:any){

    }
    finally{
       setIsLoading(false) 
    }
   
  };

  const copyToClipboard = () => {
    if (shortUrl) navigator.clipboard.writeText(shortUrl);
  };

  return (
    <main className="min-h-screen bg-[hsl(240,7%,79%)] text-[hsl(220,20%,20%)] font-[Poppins] flex flex-col items-center justify-center px-6 py-12">
      { popup &&
      <div className=" h-screen  absolute flex max-w-xl items-center justify-center ">
      <PopupUp/>
    </div>
         }
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-[hsl(212,90%,45%)] mb-2">
          Shortly
        </h1>
        <p className="text-[hsl(220,10%,45%)]">
          Shorten, manage, and share your links with ease.
        </p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-[hsl(240,7%,79%)] rounded-2xl shadow-xl backdrop-blur-md p-8 flex flex-col gap-6">
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
         <div className="h-auto p-1.5">

          {progress?.messages?.map((updates:any)=>{
            return(
               <div className="w-full p-3 text-[hsl(210,5%,15%)] bg-[hsl(210,17%,93%)] rounded-sm border border-white/15 ">
               </div>
            )

          })}
         </div>
           {isLoading ?
           <div className=" w-full p-2 mt-2 rouded-xl bg-[#dbdbe0]">Processing...</div>:<></> 
          }
          
          {shortUrl && (
            <div className="mt-4 bg-white/80 border border-[hsl(220,10%,80%)] rounded-xl p-3 flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(212,90%,45%)] font-semibold break-all"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="ml-auto text-[hsl(220,15%,35%)] border border-[hsl(212,90%,45%)/20] px-3 py-1 rounded-lg hover:bg-[hsl(212,90%,52%)/10]"
              >
                Copy
              </button>
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <Content/>
         
        {/* Footer */}
         <Footer/> 
      </div>
    </main>
  );
}
