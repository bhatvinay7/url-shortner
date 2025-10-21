'use client";';
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, icon }: Props) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-[hsl(27,19%,89%)] shadow-md rounded-2xl p-5 flex items-center justify-between border border-gray-100"
  >
    <div>
      <p className="text-gray-800 text-sm">{title}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
    <div className="bg-[hsl(30,90%,90%)] p-3 rounded-full">{icon}</div>
  </motion.div>
);

export default SummaryCard;
