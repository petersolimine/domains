import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen sm:bg-white bg-gradient-to-r from-cyan-500 to-blue-200 bg-opacity-100 px-2">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
