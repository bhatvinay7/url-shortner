// import Image, { type ImageProps } from "next/image";
// import { Button } from "@repo/ui/button";
// import styles from "./page.module.css";
import {getUrls} from '../utils/api/getUrls'
export default async function Page() {
  const response=await getUrls()

  return (
    <div className="w-full h-screen overflow-y-auto">
    

    </div>
  )

}  

