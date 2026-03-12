// app/reset-password/page.tsx
'use client'

import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Сброс пароля</h1>
      <input
        type="email"
        placeholder="Введите ваш email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-full">
        Отправить ссылку
      </button>
    </div>
  );
}