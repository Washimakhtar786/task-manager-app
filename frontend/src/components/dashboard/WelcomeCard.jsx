import { useAuth } from "../../context/AuthContext.jsx";

export default function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome back,
        {" "}
        {user?.name} 👋
      </h1>

      <p className="mt-3 text-indigo-100">
        Stay productive and manage your daily work efficiently.
      </p>
    </div>
  );
}