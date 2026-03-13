"use client";

import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ user: string; reply: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;
    setLoading(true);

    const currentMessage = message;
    setMessage("");
    setChat([...chat, { user: currentMessage, reply: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await res.json();
      setChat(prev =>
        prev.map(c =>
          c.user === currentMessage ? { user: currentMessage, reply: data.reply } : c
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border rounded p-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900">
        {chat.map((c, idx) => (
          <div key={idx}>
            <p className="font-semibold text-black dark:text-white">You: {c.user}</p>
            <p className="text-gray-700 dark:text-gray-300">Bot: {c.reply}</p>
          </div>
        ))}
        {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}