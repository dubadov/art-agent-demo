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
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
