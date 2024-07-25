import type { Metadata } from "next";

import "./globals.css";
import ProviderApp from "../Provider/ProviderApp";
import Favicon from "@/app/favicon.ico";
import { Nunito_Sans } from "next/font/google";
const nutino = Nunito_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Teris Game | StarkArcade Hub",
  metadataBase: new URL("https://teris-game.starkarcade.com/"),
  description:
    "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
  icons: {
    icon: Favicon.src,
    shortcut: Favicon.src,
    apple: Favicon.src,
    other: { rel: "apple-touch-icon-precomposed", url: Favicon.src },
  },

  keywords: ["StarkPot", "What is StarkPot", "StarkArcade Hub"],
  openGraph: {
    title: "Teris Game | StarkArcade Hub",
    description:
      "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
    images: [
      {
        url: "./public/assets/banner/banner.png",
        width: 1200,
        height: 600,
        type: "image/png",
      },
    ],
    locale: "en_US",
    url: "https://teris-game.starkarcade.com/",
    type: "website",
    emails: "karasbuilder@gmail.com",
    siteName: "StarkPot",
  },
  twitter: {
    title: "Teris Game | StarkArcade Hub",
    description:
      "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
    images: "./public/assets/banner/banner.png",
    site: "https://teris-game.starkarcade.com/",
    creator: "@StarkArcade Hub",
    players: {
      playerUrl: "https://teris-game.starkarcade.com",
      streamUrl: "https://teris-game.starkarcade.com",
      width: 360,
      height: 560,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@starkarcade" />
        <meta name="twitter:title" content="Teris Game | StarkArcade Hub" />
        <meta
          name="twitter:description"
          content="Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet"
        />
        <meta
          name="twitter:player"
          content="https://your-domain.com/twitter-card.html"
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta
          name="twitter:image"
          content="https://teris-game.starkarcade.com/"
        />
      </head> */}
      <body className={nutino.className}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
