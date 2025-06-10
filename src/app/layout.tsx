import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GraphDexStreams - Real-Time Data Analysis",
  description: "Real-time data analysis platform for DEXs and liquidity pools",
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: '/logo.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
