// import Image, { type ImageProps } from "next/image";
// import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import AnalyticsDashboard from "../components/ui/AnalyticsDashboard";
export default function Page() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <AnalyticsDashboard />

    </div>
  )

}  

