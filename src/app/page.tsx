"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">⚽ Welcome to Mini Betting App</h1>
      <p className="text-gray-600 mb-6">
        Browse upcoming matches and place your bets with ease.
      </p>
      <Link
        href="/matches"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Matches
      </Link>
    </main>
  );
}