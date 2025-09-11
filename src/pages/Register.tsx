import { useState } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-200 via-purple-200 to-pink-200">
      <Toaster />
      <form
        onSubmit={submit}
        className="relative bg-white rounded-3xl shadow-2xl w-1/2 max-w-md p-8
                   backdrop-blur-md bg-opacity-80 animate-fadeIn scale-up"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mb-4 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mb-4 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
        />

        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mb-4 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mb-6 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
        />

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <button
          disabled={loading}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
