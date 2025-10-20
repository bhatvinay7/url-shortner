"use client";
import SummaryCard from "./SummaryCard";
import OSStats from "./OsStats";
import DeviceStats from "./DeviceStats";
import {JSX} from 'react'
import { Smartphone, Monitor, Tablet, MousePointerClick, Users,MousePointer, Laptop, Terminal } from "lucide-react";

export type OSData = { uniqueClicks: number; osType: string | null; uniqueUsers: number };
export type DeviceStat = { uniqueClicks: number; deviceName: string | null; uniqueUsers: number };
type TotalStats = { totalClicks: number; uniqueUsers: number };

interface AnalyticsProps {
  osType: OSData[];
  deviceType: DeviceStat[];
  totalStatus: TotalStats;
}
  
  const AnalyticsDashboard = ({ osType, deviceType, totalStatus }:AnalyticsProps) => {
    
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
    <div className="min-h-screen bg-[hsl(263,48%,95%)]    overflow-y-auto">
      
      <div className="pl-2 pr-4 py-4">
        <div className=" flex w-full gap-6 mb-3">
          <div className=" w-full flex gap-x-2 ">
            <SummaryCard
              title="Total Clicks"
              value={totalStatus.totalClicks}
              icon={
                <MousePointer className="text-[hsl(30,90%,60%)]" size={28} />
              }
            />
            <SummaryCard
              title="Unique Users"
              value={totalStatus.uniqueUsers}
              icon={<Users className="text-[hsl(30,90%,60%)]" size={28} />}
            />
          </div>
        </div>
    
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
