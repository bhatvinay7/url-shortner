"use client";
import React from "react";
import { axiosPublic } from "../../../lib/axios";
import { useEffect } from "react";
import ErrorPage from "../../../components/ui/error-page";
import processData from "../../../utils/getdata";
import { useParams } from "next/navigation";
import {redirectUser} from '../../../utils/api/redirect'

export default function Redirect() {
  try {
    const params = useParams<{ hash: string }>();
    const hash = params.hash;
    useEffect(() => {
      async function fetch() {
        const data = await processData()();
        await redirectUser(data,hash)
        
      }
      try {
        fetch();
      } catch (error: any) {
        console.log(error.message);
      }
    }, []);
  } catch (error: any) {
    return <ErrorPage />;
  }
  return (
    <div className="h-screen bg-white/70 flex ietems-center justtify-center w-full">
      <p className="w-fit  absolute top-1/2 max-auto text-base sm:text-2xl font-sans text-indigo-950">
        Loading... wait for a moment!
      </p>
    </div>
  );
}
