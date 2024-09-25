import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle user login
  const loginUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("https://guptag.pythonanywhere.com/accounts/login/", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data); // Store user data (tokens)
        navigate("/"); // Redirect to home page on successful login
        alert("Logged in successfully!")
        return { success: true };
      }
      else {
        // Return failure message if login fails
        return {
          success: false,
          message: "Invalid username or password!"
        };
      }
    }
    catch (error) {
      // Handle any unexpected errors
      return {
        success: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    setUser(null); // Clear user data on logout
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // This is a placeholder to handle any initial setup if needed, such as fetching user data.
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
