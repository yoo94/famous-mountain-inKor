// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/app/(layout)/components/header';
import Footer from '@/app/(layout)/components/footer';
import SessionWrapper from '@/app/(layout)/components/session-wrapper';

const APP_NAME = 'FMK App';
const APP_DEFAULT_TITLE = 'FMK App';
const APP_TITLE_TEMPLATE = '%s - FMK App';
const APP_DESCRIPTION = '한국의 100대 명산';

// Metadata 설정
export const metadata: Metadata = {
  applicationName: APP_NAME,
  icons: [{ rel: 'icon', url: '/assets/logo-192x192.png', sizes: '192x192' }],
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <title>한국의 100대 명산</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        {/* SessionWrapper로 감싸기 */}
        <SessionWrapper>
          <main className="flex-grow">{children}</main>
        </SessionWrapper>
        <Footer />
      </body>
    </html>
  );
}
