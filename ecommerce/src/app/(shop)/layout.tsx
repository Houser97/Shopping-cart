'use client'

import Header from "@/components/header/Header";
import { useAuthStore } from "@/store/auth/auth-store";
import { useEffect } from "react";

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      {children}
    </main>
  );
}