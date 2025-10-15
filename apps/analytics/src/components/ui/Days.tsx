import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { date: string; dailyClicks: number }[];
}

const Last7DaysChart = ({ data }: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className=" bg-[hsl(240,5%,96%)] shadow-md rounded-2xl p-6 mb-3 border border-gray-100"
  >
    <h2 className="text-lg font-medium text-gray-800 mb-4">
      Last 7 Days Clicks
    </h2>
    <div className="h-42 ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#677" }} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="dailyClicks"
            fill="hsl(237.1, 90%, 72.5%)"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default Last7DaysChart;
