import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a73e8",
};

export const metadata: Metadata = {
  title: "Banke Cycle Co - Share Your Experience on Google",
  description: "Share your 5-star Google review for Banke Cycle Co, Ahmedabad's trusted bicycle showroom in Panchkuva. Quick, easy 1-click review posting.",
  keywords: ["Banke Cycle Co", "Bicycle shop Ahmedabad", "Panchkuva cycle market", "Google review Banke Cycle Co"],
  openGraph: {
    title: "Review Banke Cycle Co on Google",
    description: "Help others discover great bicycles in Ahmedabad! 1-click review posting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-slate-900 selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
