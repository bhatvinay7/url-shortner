import type { Metadata } from "next";
import localFont from "next/font/local";
import RootProvider from '../components/ui/ReduxRootProvider'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "URL shortner",
  description: "Easily access your url and share it with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen `}>
        <RootProvider>
        {children}

        </RootProvider>
      </body>
    </html>
  );
}
