import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">
          Task Manager
        </h1>

        <p className="mt-6 text-xl">
          Organize your work and boost your productivity.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
  to="/register"
  className="rounded-lg bg-red-500 px-8 py-3 text-3xl font-bold text-yellow-300"
>
  Get Started
</Link>

          <Link
            to="/login"
            className="rounded-lg border border-white px-6 py-3 font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}