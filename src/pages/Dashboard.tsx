import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import type { RootState } from "../redux/store";

export default function Dashboard() {
  const { user } = useSelector((s: RootState) => s.auth);

  return (
    <>
      <Navbar/>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-4">Welcome, {user?.name ?? user?.email}</p>
      </main>
    </>
  );
}
