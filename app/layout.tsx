import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financial dashboard - Amadou Sow",
  description: "Développeur web Fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow pt-10"> {/* pt-20 pour l'espace sous le header fixe */}
          {children}
        </main>
      </body>
    </html>
  );
}