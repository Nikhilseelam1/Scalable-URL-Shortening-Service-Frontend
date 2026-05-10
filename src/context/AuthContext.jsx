import { createContext, useContext, useEffect, useState } from "react";
import { logout as logoutApi } from "../api/auth.api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setUser({ token });
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    }

    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);