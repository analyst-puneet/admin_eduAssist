import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = "https://backend-aufx.onrender.com";


const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const isSessionRoute =
    location.pathname.startsWith("/session/login") ||
    location.pathname.startsWith("/session/signup");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/validate`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserId(response.data.userId);
        setError(null);
      } else {
        setUserId(null);
      }
    } catch (error) {
      const errorCode = error.response ? error.response.status : 500;
      setUserId(null);

      // Only set error if NOT on login or signup routes
      if (!isSessionRoute) {
        setError(errorCode);

        // If not on login/signup and unauthorized, redirect
        if (errorCode === 401) {
          navigate("/session/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // On session routes, skip validation
    if (isSessionRoute) {
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [location.pathname]);

  return {
    userId,
    isAuthenticated: !!userId,
    error: isSessionRoute ? null : error,
    loading,
  };
};

export default useAuth;
