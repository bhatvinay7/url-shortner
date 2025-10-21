"use client";
import { motion } from "framer-motion";
import { TrendingUp, Zap, RefreshCw, BarChart3,Link as ReactLink,ChevronDown,ChevronUp} from "lucide-react";
import { useState} from "react";
import Link  from "next/link"
import Togglecomponent from "./togglecomponent";
import { topicAnalytics } from "../../lib/redux/featuresSlice/topicAnalyticsSlice";
import {sideBarState} from '../../lib/redux/featuresSlice/slideBarSlice'

import { useDispatch, useSelector } from "react-redux";
interface SidebarProps {
  onFilterSelect?: (topic: string) => void;
}

const Sidebar = ({ onFilterSelect }: SidebarProps) => {
  const [active, setActive] = useState("urls");
  const sideBarValue=useSelector(sideBarState)
  const [subActive, setSubActive] = useState<boolean>(true);
  const dispatch = useDispatch();
  
  const menuItems = [
    {
      label: "Overall Analytics",
      value: "overall",
      icon: <BarChart3 size={22} />,
      link:"/overAllAnalytics"
    },

    {
      label: "Urls",
      value: "urls",
      icon: <ReactLink size={22} />,
      link:"/"
    },
  ];

  const subMenueItems = [
    {
      label: "acquisition",
      value: "acquisition",
      icon: <TrendingUp size={22} />,
      link:"/topic_url_analytics"
    },
    {
      label: "activation",
      value: "activation",
      icon: <Zap size={22} />,
      link:"/topic_url_analytics"
    },
    {
      label: "retention",
      value: "retention",
      icon: <RefreshCw size={22} />,
      link:"/topic_url_analytics"
    },
  ];

  const handleClick = (value: string) => {
    setActive(value);
    if (onFilterSelect) onFilterSelect(value);
  };

  return (
    <div className={` ${sideBarValue ?"block":" hidden sm:block "} h-screen top-[40px] sm:top-0 absolute sm:sticky sm:border sm:border-black/12 sm:w-auto  w-full  bg-gray-100 p-1 `}>
     
      <div className="absolute -right-4">
      <Togglecomponent/>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6 mt-3 text-gray-800 text-center"
      >
        Analytics Overview
      </motion.h1>

      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className=" w-full h-screen bg-gray-100 shadow-md   flex flex-col"
      >
        {/* Menu */}
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
          {menuItems.map((item) => {
            const isActive = item.value === active;
            return (
              <Link
                href={item.link}
                key={item.value}
                onClick={() => handleClick(item.value)}
                className={`w-full flex items-center gap-3 p-1.5 sm:p-2 md:p-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[hsl(30,90%,90%)] text-[hsl(30,90%,45%)]"
                    : "text-gray-700 hover:bg-[hsl(30,90%,95%)]"
                }`}
              >
                <span
                  className={`${
                    isActive
                      ? "text-[hsl(30,90%,50%)]"
                      : "text-[hsl(30,90%,60%)]"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className=" w-full h-auto flex flex-col overflow-hidden ">
            <button
              className=" relative w-full flex rounded-xl text-sm font-medium transition-all hover:bg-[hsl(30,90%,90%)]"
              onClick={() => {
                setSubActive(!subActive);
              }}
            >
              <div className=" self-start relative flex space-x-2 left-2 p-1.5 sm:p-2 md:p-3  text-black/75 ">
              <span>Topics</span>
              {subActive ?  <ChevronUp className="w-5 h-5"/> :<ChevronDown className="w-5 h-5"/>}
              
              </div> 
            </button>
            <div className=" flex-1 overflow-x-hidden top-2 space-y-2 ">
              {subActive &&
                subMenueItems.map((item) => {
                  const isActive = item.value === active;
                  return (
                    <Link
                      href={`${item.link}/${item.label}`}
                      key={item.value}
                      onClick={() =>{dispatch(topicAnalytics(item.label) as any), handleClick(item.value)}}
                      className={`w-full flex items-center gap-3 p-1.5 sm:p-2 md:p-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[hsl(30,90%,90%)] text-[hsl(30,78%,73%)]"
                    : "text-gray-700 hover:bg-[hsl(30,90%,95%)]"
                }`}
                    >
                      <span
                        className={`${
                          isActive
                            ? "text-[hsl(30,90%,50%)]"
                            : "text-[hsl(30,90%,60%)]"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
