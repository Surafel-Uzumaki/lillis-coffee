import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";

<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap"
  rel="stylesheet"
/>;

// Load Google Fonts properly
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Lillis Coffee | Artisan Roastery",
  description: "Specialty coffee roasted fresh daily in the heart of the city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="bg-white text-amber-950">{children}</body>
    </html>
  );
}
