import type { Metadata } from "next";
import './globals.css';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
const APP_NAME = "FMK App";
const APP_DEFAULT_TITLE = "FMK App";
const APP_TITLE_TEMPLATE = "%s - FMK App";
const APP_DESCRIPTION = "한국의 100대 명산";

// Viewport 설정을 별도로 분리합니다.
export const viewport: { initialScale: number; shrinkToFit: string; themeColor: string; minimumScale: number; width: string; viewportFit: string } = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: "no",
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

// Metadata 설정
export const metadata: Metadata = {
  applicationName: APP_NAME,
  icons: [
    { rel: "icon", url: "/assets/logo-192x192.png", sizes: "192x192" }
  ],
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",  // 경로가 assets 폴더로 수정되었습니다.
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

// RootLayout 컴포넌트
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
