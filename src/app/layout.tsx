import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const font = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-background flex flex-col w-screen h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
