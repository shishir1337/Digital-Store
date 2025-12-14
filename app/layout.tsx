import type { Metadata } from "next";
import { Outfit,Fira_Code } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SEAGM - Your Gaming Partner",
    template: "%s | SEAGM",
  },
  description: "Shop for game cards, top-ups, and gift cards. Get the best deals on gaming credits, mobile game top-ups, and digital gift cards from SEAGM.",
  keywords: ["game cards", "gaming top-up", "gift cards", "digital games", "SEAGM"],
  authors: [{ name: "SEAGM" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SEAGM",
    title: "SEAGM - Your Gaming Partner",
    description: "Shop for game cards, top-ups, and gift cards. Get the best deals on gaming credits and digital gift cards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAGM - Your Gaming Partner",
    description: "Shop for game cards, top-ups, and gift cards. Get the best deals on gaming credits and digital gift cards.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
