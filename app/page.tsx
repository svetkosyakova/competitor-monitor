

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
      <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
        Competitor Monitor
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl text-center">
        Welcome! This is your real home page. You can now edit <code>app/page.tsx</code> and see the changes immediately.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com/svetkosyakova/competitor-monitor"
          className="px-5 py-3 bg-black text-white rounded hover:bg-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        <a
          href="https://vercel.com"
          className="px-5 py-3 border border-black rounded hover:bg-gray-100 dark:border-white dark:hover:bg-gray-900 dark:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a>
      </div>
    </main>
  );
}