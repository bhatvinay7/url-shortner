import React from "react";
import { MousePointerClick, MousePointer, Link2, Users } from "lucide-react";

type TotalStats = {
  totalClicks: number;
  uniqClicks: number;
};

type UrlItem = {
  shortUrl: string;
  totalClicks: number;
  uniqueUsers: number;
};

interface UrlAnalyticsProps {
  totalStats: TotalStats[];
  urlsArray: UrlItem[];
}

const UrlAnalytics: React.FC<UrlAnalyticsProps> = ({
  totalStats,
  urlsArray,
}) => {
  return (
    <div className="p-6 space-y-6 bg-[hsl(220,20%,97%)] h-full ">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[hsl(220,20%,20%)]">
        🔗 URL Analytics Overview
      </h2>

      {/* Total Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-[hsl(68,26%,88%)] border border-black/15 rounded-xl shadow-sm hover:shadow-md transition">
          <MousePointerClick className="text-[hsl(210,85%,55%)] w-6 h-6 mb-2" />
          <p className="text-sm text-gray-500">Total Clicks</p>
          <p className="text-2xl font-bold text-[hsl(220,20%,20%)]">
            {totalStats?.[0]?.totalClicks}
          </p>
        </div>

        <div className="p-5 bg-[hsl(68,26%,88%)] border border-black/15 rounded-xl shadow-sm hover:shadow-md transition">
          <MousePointer className="text-[hsl(270,80%,60%)] w-6 h-6 mb-2" />
          <p className="text-sm text-gray-500">Unique Clicks</p>
          <p className="text-2xl font-bold text-[hsl(220,20%,20%)]">
            {totalStats?.[0]?.uniqClicks}
          </p>
        </div>
      </div>

      {/* URL Details Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[hsl(220,20%,25%)]">
          Top Short URLs
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-sm text-sm text-left">
            <thead>
              <tr className="bg-[hsl(68,26%,88%)] border border-black/15 text-[hsl(220,15%,30%)]">
                <th className="py-3 px-4 font-medium">Short URL</th>
                <th className="py-3 px-4 font-medium text-center">
                  Total Clicks
                </th>
                <th className="py-3 px-4 font-medium text-center">
                  Unique Users
                </th>
              </tr>
            </thead>
            <tbody>
              {urlsArray?.map((url, i) => (
                <tr
                  key={i}
                  className="border-t bborder border-black/15 hover:bg-[hsl(220,20%,97%)] transition"
                >
                  <td className="py-3 px-4 flex items-center gap-2 text-[hsl(220,20%,25%)]">
                    <Link2 href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${url?.shortUrl}`} className="w-5 h-5 text-[hsl(210,80%,55%)]" />
                    <span className="font-medium">{url?.shortUrl?`${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${url?.shortUrl}`:""}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-[hsl(220,20%,25%)] font-semibold">
                    {url?.totalClicks}
                  </td>
                  <td className="py-3 px-4 text-center text-[hsl(220,20%,25%)] font-semibold">
                    <div className="flex justify-center items-center gap-1">
                      <Users className="w-4 h-4 text-[hsl(280,70%,55%)]" />
                      {url?.uniqueUsers}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {urlsArray?.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No URL analytics data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlAnalytics;
