"use client";
import { useState } from "react";

export default function Monitoring() {
  const [site, setSite] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleMonitor = () => {
    setStatus(`Мониторинг сайта "${site}" запущен`);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">Monitoring</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Введите URL сайта"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="flex-1 p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          onClick={handleMonitor}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Запустить
        </button>
      </div>

      {status && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-black dark:text-white">
          {status}
        </div>
      )}
    </main>
  );
}