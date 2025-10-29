"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  sideBarState,
  toggleSidebar,
} from "../../lib/redux/featuresSlice/slideBarSlice";
import Togglecomponent from "./togglecomponent";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";
import { useDispatch } from "react-redux";
export default function SidebarController({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useSelector(sideBarState);
  const dispatch = useDispatch();
  return (
    <div
      className={`w-full  max-h-screen bg-white overflow-y-scroll  relative overflow-x-hidden grid grid-cols-[1fr] ${value ? " sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]" : "sm:grid-cols-[120px_1fr]"}`}
    >
      <div className=" w-full h-10 inset-0 relative z-[42] bg-gray-100 p-2   block sm:hidden">
        {!value ? (
          <Menu
            onClick={() => {
              dispatch(toggleSidebar(true));
            }}
            className=" absolute top-5 left-2  w-6 h-6 text-black/75 "
          />
        ) : (
          <div className=" w-full absolute left-2 top-5 block sm:hidden">
            <X
              onClick={() => {
                dispatch(toggleSidebar(false));
              }}
              className=" w-6 h-6 m-0 text-black/75 hover:text-red-500"
            />
          </div>
        )}
      </div>
      {value ?
        <div className="  top-0 sticky  h-full w-full flex justify-center p-1 z-[42] bg-white sm:border sm:border-black/12 ">
           <div className="absolute -right-2 z-[43] sm:-right-4">
        <Togglecomponent />
      </div>
          <Sidebar />
        </div>
       : 
        <div className={` ${value ? "hidden":" block w-full "}  bg-gray-100  sm:relative sm:border sm:border-black/12 sm:h-full `}>
          <div className=" absolute -right-4 top-1">
            <Togglecomponent />
          </div>
        </div>
      
      }

      {children}
    </div>
  );
}
