import localFont from "next/font/local";
import Link from 'next/link'
import "./globals.css";
import Navbar from "./components/Navbar";


import {getServerSession} from "next-auth";
import SessionProvider from "@/utils/SessionProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "StudyBuddy",
  description: "app to find study buddy's",
};


export default async function RootLayout({ children }) {



const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[url('y2kbgv3.png')] cursor-[url('default_cursor.png'), auto]`}
      >
        <SessionProvider session={session}>
          <div>
        <Navbar></Navbar>
        {children}
        </div>
        </SessionProvider>

        
      </body>
    </html>
  );
}
