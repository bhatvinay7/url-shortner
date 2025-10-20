import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RedduxProvider from "../components/ui/ReduxRootProvider";
import Sidebar from "../components/ui/sidebar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "urlshortner-analytics",
  description: "Monitor and analyze your shortened URLs with ease.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RedduxProvider>
          <div className="w-full min-h-screen grid grid-cols-[300px_1fr]">
            <Sidebar />
            {children}
          </div>
        </RedduxProvider>
      </body>
    </html>
  );
}
