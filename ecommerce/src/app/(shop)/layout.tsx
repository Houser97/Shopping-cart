'use client'

import { validate } from "@/actions/auth/auth";
import Header from "@/components/header/Header";
import { useAuthStore } from "@/store/auth/auth-store";
import { useEffect } from "react";

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  const validateSession = async () => {
    await validate()
    checkAuthStatus();
  }

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      {children}
    </main>
  );
}