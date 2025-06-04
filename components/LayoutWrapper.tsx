// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/dashboard");

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
