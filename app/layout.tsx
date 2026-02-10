import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SketchAI",
  description: "Explain ideas with tiny inline animations"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
