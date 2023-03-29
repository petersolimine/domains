import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-200 bg-opacity-100 sm:bg-gradient-to-r from-cyan-50 to-blue-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
