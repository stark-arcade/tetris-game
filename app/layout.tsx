import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderApp from "./Provider/ProviderApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teris Games | StarkArcade Hub",
  description: "Game Build By StarkArcade Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
