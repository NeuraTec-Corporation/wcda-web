import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "WCDA exact homologation",
  description: "Local comparison route for the verified WCDA reference.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <base href="/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Preserved from the original document head. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags -- Raw original CSS must bypass Next CSS transforms. */}
        <link rel="stylesheet" href="/wcda-assets/css/plugins.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags -- Original stylesheet order is part of the reference. */}
        <link rel="stylesheet" href="/wcda-assets/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
