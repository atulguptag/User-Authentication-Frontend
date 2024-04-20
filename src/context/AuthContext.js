import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const { default: jwt_decode } = require("jwt-decode");
const AuthContext = createContext();
export default AuthContext;

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://guptag.pythonanywhere.com/api/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        alert("You're Successfully Logged In.");
        navigate("/");
        const userData = jwt_decode(data.access);
        userData.is_superuser = userData.is_superuser || false;
        setAuthTokens(data);
        setUser(userData);
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        alert("Invalid username or password. Please try again.");
      }
    }
    catch (error) {
      console.error("Something went wrong, please try again later:", error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const updateToken = useCallback(async () => {
    try {
      const response = await fetch("https://guptag.pythonanywhere.com/api/login/refresh/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logoutUser();
    }
  }, [authTokens, loading]);

  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
