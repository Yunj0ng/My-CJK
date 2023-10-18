import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { login } from "@api/auth";
import jwt_decode from "jwt-decode";

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  login: null,
  logout: null,
};
const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  // 驗證使用者token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setPayload(null);
      return;
    }
    if (token) {
      setIsAuthenticated(true);
      const tempPayload = jwt_decode(token);
      setPayload(tempPayload);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
          username: payload.username,
        },
        login: async (data) => {
          try {
            const res = await login({
              account: data.account,
              password: data.password,
            });
            if (res) {
              const { success } = res;
              const token = res.data.token;
              const userId = res.data.user.id;
              const tempPayload = jwt_decode(token);
              if (tempPayload) {
                setPayload(tempPayload);
                setIsAuthenticated(true);
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                return success;
              } else {
                setPayload(null);
                setIsAuthenticated(false);
              }
            }
          } catch (err) {
            console.error("[Login Error]:", err);
          }
        },
        logout: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
