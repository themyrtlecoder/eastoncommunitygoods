import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { ListingProvider } from "./microcomps/front/provider";
import "./styles/globals.scss";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EASTON COMMUNITY GOODS",
  description: "a digital common space for community support",
  icons: {
    icon: [ 
      {url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫶</text></svg>"}
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ListingProvider>
        <body className={`${funnelSans.variable}`}>
          {children}
        </body>
      </ListingProvider>
    </html>
  );
}
