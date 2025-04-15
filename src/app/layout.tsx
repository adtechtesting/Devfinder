import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { Provider } from "./provider";
import { Header } from "./header";
import NextTopLoader from 'nextjs-toploader';

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devfinder",
  description: "An application where developers can code together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       <Provider>
        <NextTopLoader></NextTopLoader>
          <Header>
          </Header>
          <div className=" mx-auto">
                      {children}

          </div>
       </Provider>
      </body>
    </html>
  );
}
