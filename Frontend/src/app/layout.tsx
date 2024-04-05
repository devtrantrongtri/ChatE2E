import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tittle from "@/components/TittleApp/Tittle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Security",
  description: "",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
 
        {children}

        </body>

    </html>
  );
}
