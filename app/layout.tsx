import { ReactNode } from "react";
import "./globals.css";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/icons/favicon-72x72.png"
        />
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#F7EEE5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
