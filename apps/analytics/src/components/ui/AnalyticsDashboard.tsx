"use client";
import { motion } from "framer-motion";
import SummaryCard from "./SummaryCard";
import { use, useState } from "react";
import Last7DaysChart from "./Days";
import OSStats from "./OsStats";
import DeviceStats from "./DeviceStats";
import { MousePointer, Users } from "lucide-react";
import Sidebar from "./sidebar";

const AnalyticsDashboard = () => {
  const [totalStats,setStats] = useState({totalClicks:0,uniqueUsers:0})
  const [last7Days,setDay] = useState([])
  const [osType,setOs] = useState([])
  const [deviceType,setDevice] = useState([])
   
  return (
    <div className="min-h-screen bg-[hsl(263,48%,95%)] grid grid-cols-[300px_1fr]   overflow-y-auto">
      <div className=" border-r border-r-white  top-0 sticky bg-[hsl(0,0%,100%)] p-1 ">

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6 mt-3 text-gray-800 text-center"
        >
       Analytics Overview
      </motion.h1>
        <Sidebar/>

  
      </div>
     <div className="pl-2 pr-4 py-4">
        <div className=" flex w-full gap-6 mb-3">
        <div className=" w-full flex gap-x-2 ">
        <SummaryCard
          title="Total Clicks"
          value={totalStats.totalClicks}
          icon={<MousePointer className="text-[hsl(30,90%,60%)]" size={28} />}
        />
        <SummaryCard
          title="Unique Users"
          value={totalStats.uniqueUsers}
          icon={<Users className="text-[hsl(30,90%,60%)]" size={28} />}
        />
          
        </div>  
      </div>
        <Last7DaysChart data={last7Days} />

      {/* Chart */}
      

      {/* OS & Device Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <OSStats data={osType} />
        <DeviceStats data={deviceType} />
      </div>
      
     </div>
      {/* Summary Section */}
     
    </div>
  );
};

export default AnalyticsDashboard;
