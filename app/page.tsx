// app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-black">
      <h1 className="text-5xl font-extrabold mb-6 text-black dark:text-white">
        Competitor Monitor
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl text-center">
        Welcome to your competitor tracking dashboard! Track your competitors, monitor trends, and get insights in real-time.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <a
          href="/login"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-3 border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white transition"
        >
          Sign Up
        </a>
      </div>

      <footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Competitor Monitor. All rights reserved.
      </footer>
    </main>
  );
}