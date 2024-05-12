import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  console.log(authTokens);
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null
  );

  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://guptag.pythonanywhere.com/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        }
      );
      let data = await response.json();

      if (response.status === 200) {
        alert("You're Successfully Logged In.");
        let userData = data.access;
        setAuthTokens(data);
        setUser(userData);
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
      } else {
        alert("Invalid username or password. Please check your credentials.");
      }
    } catch (error) {
      console.error("Request Timeout.", error);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = useCallback(async () => {
    try {
      let response = await fetch(
        "https://guptag.pythonanywhere.com/accounts/login/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: authTokens?.refresh }),
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        // setUser(jwt_decode(data.access));
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
  }, [authTokens?.refresh, loading]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
