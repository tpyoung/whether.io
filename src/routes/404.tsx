import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-zinc-400 mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
