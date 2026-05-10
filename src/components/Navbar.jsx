import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-semibold text-gray-900">URL Shortener</span>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 hover:text-gray-900 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;