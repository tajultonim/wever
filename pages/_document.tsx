import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta name="theme-color" content="#111827" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
