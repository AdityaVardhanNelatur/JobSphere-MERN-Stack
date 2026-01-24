import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  LayoutDashboard,
  FileText,
  LogIn,
  UserPlus
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  // Always read fresh values (avoids stale state)
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true }); // ✅ go to Landing page
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(localStorage.getItem("user")) : null;

    // ✅ Guest → Landing
    if (!token || !user) {
      navigate("/");
      return;
    }

    // ✅ Role-based redirect
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/jobs");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* LOGO */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-blue-600 font-bold text-xl cursor-pointer"
        >
          <link rel="icon" type="image/svg+xml" href="/find-job.svg" />
          <Briefcase size={22} />
          JobSphere
        </div>

        {/* NAV ITEMS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* ================= GUEST ================= */}
          {!token && (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}

          {/* ================= USER ================= */}
          {user?.role === "user" && (
            <>
              <Link
                to="/jobs"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Briefcase size={18} />
                Jobs
              </Link>

              <Link
                to="/my-applications"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <FileText size={18} />
                My Applications
              </Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}

          {/* ================= LOGOUT ================= */}
          {token && (
            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-600 hover:underline"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
