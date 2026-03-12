'use client'

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // важно, чтобы форма не перезагружала страницу
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully!");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-1 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-sm text-gray-500 mb-3">
          Минимум 6 символов
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}