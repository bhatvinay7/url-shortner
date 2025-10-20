"use client";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import Last7DaysChart from "./Days";
import OSStats from "./OsStats";
import DeviceStats from "./DeviceStats";
import { MousePointer, Users } from "lucide-react";


// import { getAdminData } from "../../utils/api/getAdminData";
// import { getUrlsData } from "../../utils/api/getUrls";
import { getTopicAnalytics } from "../../utils/api/topicAnalytics";
import { getOverallAnalytics } from "../../utils/api/overallAnalytics";
import { getUrlAnalytics } from "../../utils/api/urlAnalytics";

const AnalyticsDashboard = () => {
  const [totalStats, setStats] = useState({ totalClicks: 0, uniqueUsers: 0 });
  const [last7Days, setDay] = useState([]);
  const [osType, setOs] = useState([]);
  const [deviceType, setDevice] = useState([]);

useEffect(() => {
    async function fetch() {
      try {
        // const r1 = await getAdminData();
        const r2 = await getTopicAnalytics("acquistion");
        const r3 = await getOverallAnalytics();
        // const r4 = await getUrlAnalytics("");
        // const r5 = await getUrlsData();
        // console.log(r1)
        console.log(r2)
        console.log(r3)
        // console.log(r4)
        // console.log(r5) 
      } catch (error) {
        console.log(error)
      }
    }
    fetch()

  }, []);
  return (
    <div className="min-h-screen bg-[hsl(263,48%,95%)]    overflow-y-auto">
      
      <div className="pl-2 pr-4 py-4">
        <div className=" flex w-full gap-6 mb-3">
          <div className=" w-full flex gap-x-2 ">
            <SummaryCard
              title="Total Clicks"
              value={totalStats.totalClicks}
              icon={
                <MousePointer className="text-[hsl(30,90%,60%)]" size={28} />
              }
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
