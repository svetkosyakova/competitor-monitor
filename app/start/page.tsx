import Link from "next/link";

export default function Start() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="text-center space-y-6">

        <h1 className="text-4xl font-bold">
          Welcome
        </h1>

        <p className="text-gray-400">
          Login or create an account to continue
        </p>

        <div className="flex gap-4 justify-center">

          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10"
          >
            Register
          </Link>

        </div>

      </div>

    </main>
  );
}