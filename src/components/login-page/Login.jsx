import "./login-page.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("showPassword:", showPassword); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(e);
    setIsLoggedIn(true);
  };

  return IsLoggedIn ? ( // Check if user is truthy (logged in)
    <h1 className="already-logged">You are already logged in.</h1>
  ) : (
    <div className="logindiv">
      <div className="login-form">
        <h6 className="form-head">Welcome Back!</h6>
        <form className="form" onSubmit={handleLogin}>
          <input
            className="formm"
            type="text"
            name="username"
            placeholder="Enter Username"
            required
          />
          <div className="password-wrapper">
            <input
              className="formm"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              required
            />
            <FontAwesomeIcon
              className={`togglePassword fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              aria-label="Toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              icon={showPassword ? faEyeSlash : faEye}
            />
          </div>
          <button className="forgotPassword" type="button">
            <a href="/forgot_password">Forgot Password?</a>
          </button>
          <input
            className="btn btn-success submitBtn"
            type="submit"
            value="Login"
          />
          <p className="new-account">
            Don't have an account? <a href="/signup">Sign Up.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
