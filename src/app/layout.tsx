import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Fiesta",
  description: "A modern event landing page with RSVP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
