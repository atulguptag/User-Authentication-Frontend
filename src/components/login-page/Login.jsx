import "./login-page.css";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Assuming Font Awesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Font Awesome icons

const Login = () => {
  const { user, loginUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("showPassword:", showPassword); // Log state for debugging
  };

  return user ? ( // Check if user is truthy (logged in)
    <h1>You are already logged in.</h1>
  ) : (
    <div className="logindiv">
      <div>
        <h6 className="form-heading">Welcome Back!</h6>
        <form className="form" onSubmit={loginUser}>
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
              icon={showPassword ? faEyeSlash : faEye} // Use icons based on state
            />
          </div>
          <button className="forgotPassword" type="button">
            <Link to="/forgot_password">Forgot Password?</Link> {/* Use Link */}
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
