import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import type { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Logged in");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster />
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          <Link to='/forget-password'>Forget Password</Link>
        </label>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button type="submit" disabled={loading} className="w-full bg-sky-600 text-white py-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm">
          Don't have an account? <Link to="/register" className="text-sky-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
