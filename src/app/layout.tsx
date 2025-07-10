import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Personalised Content Dashboard",
  description: "Accumulate and manage your content based on preference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100 text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
