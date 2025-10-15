'use client';
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Apple,
  Laptop,
  Terminal,
} from "lucide-react";

interface OSData {
  osName: string;
  uniqueClicks: number;
}

interface Props {
  data: OSData[];
}

const OSStats = ({ data }: Props) => {
  // Icon mapping for OS names
  const getOSIcon = (osName: string) => {
    switch (osName.toLowerCase()) {
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
      className="bg-[hsl(241,34%,33%)] shadow-md rounded-2xl p-6 border border-gray-100"
    >
      <h2 className="text-lg font-medium text-gray-300 mb-4">
        OS Distribution
      </h2>

      <div className="space-y-3 overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-gray-300 custom-scroll">
        {data.map((os, i) => (
          <motion.div
            whileHover={{ x: 5 }}
            key={i}
            className="flex justify-between items-center bg-[hsl(0,0%,97%)] rounded-xl p-3"
          >
            <div className="flex items-center gap-2">
              {getOSIcon(os.osName)}
              <span className="text-gray-700 font-medium">{os.osName}</span>
            </div>

            <span className="text-[hsl(30,90%,50%)] font-semibold">
              {os.uniqueClicks} clicks
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OSStats;
