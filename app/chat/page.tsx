import Chat from "../components/Chat";

export default function ChatPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Chat with GPT
      </h1>
      <Chat />
    </main>
  );
}