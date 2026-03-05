import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "ArtAgent – גילוי אמנות ישראלית",
  description: "פלטפורמה מבוססת AI לגילוי מוזיאונים, גלריות, תערוכות ואמנים ישראלים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
