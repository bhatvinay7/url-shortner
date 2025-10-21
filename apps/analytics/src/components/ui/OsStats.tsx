"use client";
import { motion } from "framer-motion";
import { OSData } from "./AnalyticsDashboard";
import {
  Monitor,
  Smartphone,
  Apple,
  Laptop,
  Terminal,
  MousePointer,
  Users,
} from "lucide-react";

const OSStats = ({ data }: { data: OSData[] }) => {
  // Icon mapping for OS names
  const getOSIcon = (osType: string) => {
    switch (osType?.toLowerCase()) {
      case "windows":
        return <Monitor className="h-5 w-5 text-blue-600" />;
      case "android":
        return <Smartphone className="h-5 w-5 text-green-600" />;
      case "ios":
        return <Apple className="h-5 w-5 text-gray-700" />;
      case "macos":
        return <Laptop className="h-5 w-5 text-gray-600" />;
      case "linux":
        return <Terminal className="h-5 w-5 text-yellow-600" />;
      default:
        return <Monitor className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[hsl(0,0%,84%)] shadow-md rounded-2xl p-6 border border-gray-100"
    >
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        OS Distribution
      </h2>

      <div className="space-y-3 overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-gray-300 custom-scroll">
        {data.map((os, i) => (
          <motion.div
            whileHover={{ x: 5 }}
            key={i}
            className="flex  justify-between items-center bg-[hsl(0,0%,97%)] rounded-xl p-3"
          >
            <div className="flex items-center gap-2">
              {getOSIcon(os?.osType!)}
              <span className="text-gray-700 font-medium">{os?.osType}</span>
            </div>
            <div className="flex gap-x-2 ">
              <div className="flex gap-x-1.5 items-center">
                <span className="text-[hsl(220,3%,38%)] font-mono font-semibold">
                  {os.uniqueClicks}
                </span>
                <MousePointer className="w-4 h-4 text-black bg-gray-300 rounded-full " />
              </div>
              <div className="flex gap-x-1.5 items-center">
                <span className="text-[hsl(220,3%,38%)] font-mono font-semibold">
                  {os.uniqueUsers}
                </span>
                <Users className="w-4 text-black h-4 bg-gray-300 rounded-full items-center" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OSStats;
