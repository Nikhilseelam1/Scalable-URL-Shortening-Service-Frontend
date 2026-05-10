import { createContext, useContext, useEffect, useRef, useState } from "react";
import { refreshToken, logout as logoutApi } from "../api/auth.api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      const existing = sessionStorage.getItem("accessToken");
      if (existing) {
        setUser({ token: existing });
        setLoading(false);
        return;
      }
      try {
        const res = await refreshToken();
        const token = res.data.data.accessToken;
        sessionStorage.setItem("accessToken", token);
        setUser({ token });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setUser({ token });
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {}
    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);