import React from "react";
import {
  Smartphone,
  Monitor,
  Tablet,
  MousePointerClick,
  Users,
  CalendarDays,
  Laptop,
  Terminal,
} from "lucide-react";
import { JSX } from "react";
type OSStat = {
  uniqueClicks: number;
  osType: string | null;
  uniqueUsers: number;
};
type DeviceStat = {
  uniqueClicks: number;
  deviceName: string | null;
  uniqueUsers: number;
};
type DayStat = { dailyClicks: number; date: string };
type TotalStats = [{ totalClicks: number; uniqueUsers: number }];

interface AnalyticsProps {
  osType: OSStat[];
  deviceType: DeviceStat[];
  last7Days: DayStat[];
  totalStats: TotalStats;
}

const AnalyticsStats: React.FC<AnalyticsProps> = ({
  osType,
  deviceType,
  last7Days,
  totalStats,
}) => {
  const osIcons: Record<string, JSX.Element> = {
    Android: <Smartphone className="w-6 h-6 text-[hsl(150,70%,45%)]" />,
    Windows: <Laptop className="w-6 h-6 text-[hsl(220,70%,50%)]" />,
    Linux: <Terminal className="w-6 h-6 text-[hsl(30,80%,50%)]" />,
  };

  const deviceIcons: Record<string, JSX.Element> = {
    Desktop: <Monitor className="w-6 h-6 text-[hsl(200,80%,55%)]" />,
    Mobile: <Smartphone className="w-6 h-6 text-[hsl(160,80%,45%)]" />,
    Tablet: <Tablet className="w-6 h-6 text-[hsl(45,90%,55%)]" />,
  };

  return (
    <div className="p-6 space-y-3 bg-[hsl(120,11%,98%)] rounded-2xl h-full ">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[hsl(220,20%,20%)]">
        📊 Analytics Overview
      </h2>

      {/* Total Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="p-4 bg-[hsl(63,41%,89%)] border border-black/20 rounded-xl shadow-sm hover:shadow-md transition">
          <MousePointerClick className="text-[hsl(210,90%,55%)] w-6 h-6 mb-2" />
          <p className="text-sm text-black">Total Clicks</p>
          <p className="text-xl text-black/60 font-bold">
            {totalStats?.[0].totalClicks}
          </p>
        </div>

        <div className="p-4 bg-[hsl(63,41%,89%)] border border-black/20 rounded-xl shadow-sm hover:shadow-md transition">
          <Users className="text-[hsl(280,70%,55%)] w-6 h-6 mb-2" />
          <p className="text-sm text-black">Unique Users</p>
          <p className="text-xl text-black/60 font-bold">
            {totalStats?.[0].uniqueUsers}
          </p>
        </div>
      </div>

      {/* OS Type Stats */}
      <div>
        <h3 className="text-lg font-semibold mb-1 text-[hsl(220,20%,25%)]">
          Operating Systems
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {osType.map((os) => (
            <div
              key={os?.osType}
              className="p-4 bg-[hsl(63,41%,89%)] border border-black/20 rounded-xl shadow-sm hover:shadow-md flex items-center gap-3 transition"
            >
              {osIcons[os?.osType || ""] || (
                <Terminal className="w-6 h-6 text-[hsl(0,0%,50%)]" />
              )}
              <div>
                <p className="font-semibold text-[hsl(220,20%,25%)]">
                  {os?.osType}
                </p>
                <p className="text-sm text-gray-500">
                  Clicks: {os?.uniqueClicks}
                </p>
                <p className="text-sm text-gray-500">
                  Users: {os?.uniqueUsers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Type Stats */}
      <div>
        <h3 className="text-lg font-semibold mb-1 text-black">Devices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {deviceType.map((device) => (
            <div
              key={device?.deviceName}
              className="p-4 bg-[hsl(63,41%,89%)] border border-black/20 rounded-xl shadow-sm hover:shadow-md flex items-center gap-3 transition"
            >
              {deviceIcons[device?.deviceName || ""] || (
                <Monitor className="w-6 h-6 text-[hsl(0,0%,50%)]" />
              )}
              <div>
                <p className="font-semibold text-[hsl(220,20%,25%)]">
                  {device?.deviceName}
                </p>
                <p className="text-sm text-gray-500">
                  Clicks: {device?.uniqueClicks}
                </p>
                <p className="text-sm text-gray-500">
                  Users: {device?.uniqueUsers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last 7 Days Stats */}
      <div>
        <h3 className="text-lg font-semibold mb-1 text-[hsl(220,20%,25%)]">
          Last 7 Days
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {last7Days.map((day, i) => (
            <div
              key={i}
              className="p-3 bg-[hsl(63,41%,89%)] border border-black/20 rounded-xl shadow-sm text-center hover:shadow-md transition"
            >
              <CalendarDays className="w-5 h-5 text-[hsl(220,70%,55%)] mx-auto mb-1" />
              <p className="text-sm text-gray-500">{day?.date}</p>
              <p className="font-semibold text-[hsl(220,25%,30%)]">
                {day?.dailyClicks}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats;
