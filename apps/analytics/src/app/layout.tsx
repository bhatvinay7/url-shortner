import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RedduxProvider from "../components/ui/ReduxRootProvider";
import SidebarController from "../components/ui/sidebar-controller";
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
      <body className={`${geistSans.variable} min-h-screen overflow-y-auto ${geistMono.variable}`}>
        <RedduxProvider>
        <SidebarController>{children}</SidebarController>
        </RedduxProvider>
      </body>
    </html>
  );
}
