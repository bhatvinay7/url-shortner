"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import PopupUp from "../components/ui/signin-popup";
import {get_shorten_url} from '../utils/api/generate_short_url'
import {
  getUser_details,
   userInfo,
} from "../lib/redux/featuresSlice/userDetails";

import { useWebSocket } from "./hooks/useWesocketConnection";


interface progress{
    message:string[]
}



export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userDetails=useSelector(userInfo)
  const inputRef = useRef<HTMLInputElement>(null); 
  const [progress,setProgress]=useState<progress|null>(null)
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [permission, setPermission] = useState(false);
  const [input, setInput] = useState("");
  const [popup,setPopUp]=useState(false)


  useEffect(()=>{
    dispatch(getUser_details() as any)
    
  },[dispatch])

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


  const { connected, sendMessage } = useWebSocket({
    url: process.env.WS_SERVER_URL!,
  });

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
     if(!url)return 
     setIsLoading(true) 
     const response=await get_shorten_url(url!)
     setUrl("")
     setProgress((priv)=>({message:priv?.message  ? [...priv?.message ,response?.message]:[]}))
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
              className="border border-[hsl(228,2%,43%)] focus:ring-2 focus:ring-[hsl(212,90%,45%)] outline-none rounded-xl px-4 py-3 text-[hsl(220,20%,20%)]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
          
            />
            <button
              type="submit"
              className="bg-[#425e7bf0] hover:bg-[hsl(212,53%,35%)] text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Shorten URL
            </button>
          </form>
           {isLoading?
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
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-[hsl(212,90%,45%)] mb-3">
            How It Works 🚀
          </h3>
          <ul className="space-y-2 text-[hsl(220,10%,40%)]">
            <li>1️⃣ Paste your long URL into the input box above.</li>
            <li>
              2️⃣ Click <strong>Shorten URL</strong> — we’ll generate a clean,
              shareable link.
            </li>
            <li>3️⃣ Copy your new link and share it anywhere!</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-[hsl(212,90%,45%)] mb-3">
            Why Choose Shortly 💡
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[hsl(220,10%,40%)]">
            <li className="bg-white/70 p-3 rounded-xl shadow-sm">
              ⚡ Instant URL shortening
            </li>
            <li className="bg-white/70 p-3 rounded-xl shadow-sm">
              🔒 Secure and private
            </li>
            <li className="bg-white/70 p-3 rounded-xl shadow-sm">
              🌍 Custom branded links
            </li>
            <li className="bg-white/70 p-3 rounded-xl shadow-sm">
              📊 Real-time click analytics
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-[hsl(212,90%,45%)] mb-2">
            Ready to get started?
          </h3>
          <p className="text-[hsl(220,10%,45%)] mb-4">
            Join thousands of users making their links smarter.
          </p>
          <button className="bg-[hsl(212,90%,45%)] hover:bg-[hsl(212,90%,40%)] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
            Get Started
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-[hsl(220,10%,55%)] mt-10">
          © {new Date().getFullYear()} Shortly — Built with 💙 for simplicity
        </footer>
      </div>
    </main>
  );
}
