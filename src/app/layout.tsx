import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// default metadata for all pages, can be overridden per-page using `metadata` export
export const metadata = {
  title: "Twitt3r",
  description: "Twit-t3-r, used to learn t3.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <Toaster position="bottom-center" />
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
