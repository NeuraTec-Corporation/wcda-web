import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import { ApprovedExperienceStyle } from "@/components/theme/ApprovedExperienceStyle";
import { ApprovedThemeStyle } from "@/components/theme/ApprovedThemeStyle";
import { CursorCompanion } from "@/components/experience/CursorCompanion";
import { ExperienceMotion } from "@/components/experience/ExperienceMotion";
import { ThemePreviewBridge } from "@/components/theme/ThemePreviewBridge";
import {
  approvedExperience,
  approvedExperienceHtmlAttributes,
} from "@/config/experience";
import { isThemeLabEnabled } from "@/config/theme";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      {...approvedExperienceHtmlAttributes(approvedExperience)}
    >
      <body className="flex min-h-full flex-col overflow-x-clip font-sans">
        <ApprovedThemeStyle />
        <ApprovedExperienceStyle />
        <ExperienceMotion />
        {isThemeLabEnabled() || approvedExperience.cursorCompanion !== "off" ? (
          <CursorCompanion />
        ) : null}
        {isThemeLabEnabled() ? <ThemePreviewBridge /> : null}
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
