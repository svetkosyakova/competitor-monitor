"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "subscription=active; path=/";
    router.push("/dashboard");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold">Payment successful! Redirecting...</h1>
    </main>
  );
}