import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { LogIn, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold">
          <NavLink to="/">Isnnad</NavLink>
        </div>

        <nav className="flex items-center gap-4">
          <NavLink to="/#about" className="hover:underline">About</NavLink>
          <NavLink to="/#contact" className="hover:underline">Contact</NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className="flex items-center gap-2 px-3 py-1 border rounded">
                <LogIn size={16} /> Login
              </NavLink>
              <NavLink to="/register" className="ml-2 px-3 py-1 rounded bg-sky-600 text-white">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-1 border rounded">
                <User size={16} /> Dashboard
              </NavLink>
              <NavLink to="/profile" className="flex items-center gap-2 px-3 py-1 border rounded">
                <User size={16} /> my profile
              </NavLink>
              <button onClick={onLogout} className="ml-2 px-3 py-1 rounded border">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
