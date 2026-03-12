'use client'

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Вход пользователя
  const handleLogin = async () => {
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Введите email и пароль");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // успешный вход
    } catch (err: any) {
      console.log("Firebase login error:", err); // логируем ошибку
      if (err.code === "auth/user-not-found") {
        setMessage("Пользователь с таким email не найден");
      } else if (err.code === "auth/wrong-password") {
        setMessage("Неверный пароль");
      } else {
        setMessage("Ошибка при входе");
      }
    }
  };

  // Сброс пароля через API
  const handleResetPassword = async () => {
    setMessage("");

    if (!email.trim()) {
      setMessage("Введите email для сброса пароля");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage("Ошибка при отправке письма");
    }
  };

  // Обработка Enter для обоих полей
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded shadow relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход в SaaS</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-3"
        >
          Войти
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition"
        >
          Забыли пароль?
        </button>

        {message && (
          <p className="mt-4 text-red-500 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}