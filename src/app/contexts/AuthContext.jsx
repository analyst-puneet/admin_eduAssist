// context/AuthContext.js
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../main";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const fetchedOnce = useRef(false);

  const isSessionRoute = location.pathname.startsWith("/session");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/validate`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserId(response.data.userId);
        setError(null);

        // ✅ Already logged in but on login/signup → redirect to home
        if (isSessionRoute) {
          navigate("/");
        }
      } else {
        setUserId(null);
      }
    } catch (error) {
      const errorCode = error.response ? error.response.status : 500;
      setUserId(null);

      if (!isSessionRoute && errorCode === 401) {
        // ✅ Unauthorized and not on login → go to login
        navigate("/session/login");
      }

      setError(isSessionRoute ? null : errorCode); // hide error if on login/register
    } finally {
      setLoading(false);
      fetchedOnce.current = true;
    }
  };

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchUser();
    } else {
      setLoading(false); // ensures children render if already fetched
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated: !!userId,
        loading,
        error: isSessionRoute ? null : error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
