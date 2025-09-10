import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { registerUser } from "../redux/slices/authSlice";
import type { AppDispatch, RootState } from "../redux/store";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser   (form)).unwrap();
      toast.success("Registered — please login");
      navigate("/login");
    } catch (err: any) {
      toast.error(err || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster />
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <input required placeholder="Name" value={form.name}
            onChange={(e)=>setForm({...form, name:e.target.value})}
            className="mb-2 block w-full border rounded px-3 py-2" />

        <input required type="email" placeholder="Email" value={form.email}
            onChange={(e)=>setForm({...form, email:e.target.value})}
            className="mb-2 block w-full border rounded px-3 py-2" />

        <input required placeholder="Phone" value={form.phone}
            onChange={(e)=>setForm({...form, phone:e.target.value})}
            className="mb-2 block w-full border rounded px-3 py-2" />

        <input required type="password" placeholder="Password" value={form.password}
            onChange={(e)=>setForm({...form, password:e.target.value})}
            className="mb-4 block w-full border rounded px-3 py-2" />

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button disabled={loading} className="w-full bg-sky-600 text-white py-2 rounded">
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="mt-3 text-sm">
          Already have account? <Link to="/login" className="text-sky-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
