import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl font-bold max-w-4xl leading-tight">
          AI Product Intelligence
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl">
          Find the best prices, monitor competitors, and analyze products across multiple marketplaces using AI.
        </p>

        <Link
          href="/start"
          className="mt-10 px-8 py-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 transition"
        >
          Start Now
        </Link>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 pb-32">

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">
            AI Price Search
          </h3>
          <p className="text-gray-400">
            Instantly find product prices across multiple websites with intelligent AI analysis.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">
            Competitor Monitoring
          </h3>
          <p className="text-gray-400">
            Track competitor websites and receive updates when prices or products change.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold mb-3">
            Smart Filters
          </h3>
          <p className="text-gray-400">
            Filter results by price, delivery time, number of stores, and more.
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto text-center px-6 pb-32">

        <h2 className="text-4xl font-bold mb-12">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-gray-300">

          <div>
            <h4 className="font-semibold text-lg mb-2">1. Search a product</h4>
            <p>Type a product name or upload a photo.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">2. AI analyzes data</h4>
            <p>Our AI scans marketplaces and gathers pricing information.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">3. Get best results</h4>
            <p>Compare prices and monitor competitors instantly.</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-32">

        <h2 className="text-4xl font-bold">
          Start optimizing your product research today
        </h2>

        <Link
          href="/start"
          className="inline-block mt-8 px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
        >
          Get Started
        </Link>

      </section>

    </main>
  );
}