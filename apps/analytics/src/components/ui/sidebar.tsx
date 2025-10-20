"use client";
import { motion } from "framer-motion";
import { TrendingUp, Zap, RefreshCw, BarChart3,Link as ReactLink} from "lucide-react";
import { useState} from "react";
import Link  from "next/link"
import { useDispatch } from "react-redux";
import { topicAnalytics } from "../../lib/redux/featuresSlice/topicAnalyticsSlice";

interface SidebarProps {
  onFilterSelect?: (topic: string) => void;
}

const Sidebar = ({ onFilterSelect }: SidebarProps) => {
  const [active, setActive] = useState("overall");
  const [subActive, setSubActive] = useState<boolean>(false);
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
    <div className=" border-r border-r-white  top-0 sticky bg-[hsl(0,0%,100%)] p-1 ">
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
        className=" w-full h-screen bg-white shadow-md border-r border-gray-100  flex flex-col"
      >
        {/* Header */}
        <div className="mb-6  ">
          <p className="text-sm  text-gray-500">Filter by Topic</p>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
          {menuItems.map((item) => {
            const isActive = item.value === active;
            return (
              <Link
                href={item.link}
                key={item.value}
                onClick={() => handleClick(item.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all
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
          <div className="w-full h-auto flex flex-col ">
            <button
              onClick={() => {
                setSubActive(!subActive);
              }}
            >
              topics
            </button>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
              {subActive &&
                subMenueItems.map((item) => {
                  const isActive = item.value === active;
                  return (
                    <motion.button
                      key={item.value}
                      whileHover={{ x: 1 }}
                      onClick={() => handleClick(item.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all
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
                      <span  onClick={() => dispatch(topicAnalytics(item.label) as any)}>{item.label}</span>
                    </motion.button>
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
