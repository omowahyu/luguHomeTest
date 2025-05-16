import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import Providers from "@/components/Providers"; //Query Providers
import "./globals.css";

const Sans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"] });
const Mono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lugu Software – Take Home Test",
  description:
    "A user management interface built as a take-home test using Next.js.",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Lugu Software – Take Home Test",
    description: "Explore the UI implementation by Wahyu Chrisdianto.",
    url: "https://lugutest.moyu.my.id",
    siteName: "Lugu Test App",
    images: [
      {
        url: "/next.png", // put your image in /public
        width: 1200,
        height: 630,
        alt: "Preview of the User App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugu Software – Take Home Test",
    description: "User management app built with Next.js 15 and Tailwind CSS.",
    images: ["/next.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Sans.variable} ${Mono.variable} antialiased md:subpixel-antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
