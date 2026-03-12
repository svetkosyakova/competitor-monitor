import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Competitor Monitor",
  description: "SaaS for competitor tracking",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}