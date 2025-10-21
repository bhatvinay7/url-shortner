'use client";';
import { motion } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Tablet,
  MousePointerIcon,
  Users,
} from "lucide-react";
import { DeviceStat } from "./AnalyticsDashboard";

const DeviceStats = ({ data }: { data: DeviceStat[] }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className=" bg-[hsl(0,0%,84%)] shadow-md rounded-2xl p-6 border border-gray-100"
  >
    <h2 className="text-lg font-medium text-gray-700 mb-4">
      Device Distribution
    </h2>
    <div className="space-y-3 overflow-y-auto max-h-64 pr-2  custom-scroll ">
      {data.map((device, i) => (
        <motion.div
          whileHover={{ x: 5 }}
          key={i}
          className="flex justify-between items-center bg-[hsl(0,0%,97%)] rounded-xl p-3"
        >
          <div className="flex items-center gap-3">
            {device.deviceName === "Mobile" && (
              <Smartphone className="text-[hsl(30,90%,60%)]" size={22} />
            )}
            {device.deviceName === "Desktop" && (
              <Monitor className="text-[hsl(30,90%,60%)]" size={22} />
            )}
            {device.deviceName === "Tablet" && (
              <Tablet className="text-[hsl(30,90%,60%)]" size={22} />
            )}
            <span className="text-gray-700 font-medium">
              {device?.deviceName}
            </span>
          </div>
          <div className="flex gap-x-2 ">
            <div className="flex gap-x-1.5 items-center">
              <span className="text-[hsl(220,3%,38%)] font-mono font-semibold">
                {device.uniqueClicks}
              </span>
              <MousePointerIcon className="w-4 h-4 text-black bg-gray-300 rounded-full " />
            </div>
            <div className="flex gap-x-1.5 items-center">
              <span className="text-[hsl(220,3%,38%)] font-mono font-semibold">
                {device.uniqueUsers}
              </span>
              <Users className="w-4 text-black h-4 bg-gray-300 rounded-full items-center" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default DeviceStats;
