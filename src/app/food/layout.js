import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./_components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TokoKita - Belanja Online Terpercaya",
  description:
    "Temukan berbagai kebutuhan Anda di TokoKita dengan harga terbaik dan pengiriman cepat",
};

export default function SupermarketLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navigation />

      {/* Main Content Wrapper with padding for navigation */}
      <main className="pt-16 md:pl-64 min-h-screen">
        {/* Mobile padding bottom to prevent content from being hidden under bottom nav */}
        <div className="pb-16 md:pb-0">{children}</div>
      </main>
    </div>
  );
}
