"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  { name: "Starter", price: "900 ₽" },
  { name: "Pro", price: "1900 ₽" },
  { name: "Business", price: "3900 ₽" },
];

export default function Pricing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (planName: string) => {
    setLoading(true);

    // Устанавливаем cookie для тестовой подписки
    document.cookie = "subscription=active; path=/";

    // Небольшая задержка, чтобы cookie успело установиться
    setTimeout(() => {
      router.push("/dashboard");
    }, 50);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-6">
      <h1 className="text-5xl font-bold mb-12">Pricing (Test Mode)</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-4xl font-bold mb-6">{plan.price}</p>
            <button
              disabled={loading}
              onClick={() => handleSubscribe(plan.name)}
              className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}