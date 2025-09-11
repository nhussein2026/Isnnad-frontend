import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useSelector((s: RootState) => s.auth);

  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-4">Welcome, {user?.name ?? user?.email}</p>
        <h2>Appl for achieving task</h2>
        <Link to="/apply" className="text-blue-600 underline">Apply Now</Link>
      </main>
    </>
  );
}
