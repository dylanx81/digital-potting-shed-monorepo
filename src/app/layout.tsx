import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Garden App",
  description: "Digital Potting Shed - Track your garden plants",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
        `}</style>
      </head>
              <body>
          {children}
        </body>
    </html>
  );
}
