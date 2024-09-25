import "./login.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    document.title = "Login | Moviepassa";
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(e);
    if (response.success) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setIsLoggedIn(false);
      setLoginError(response.message);
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="container-xl d-flex justify-content-center align-items-center mt-5">
        <div className="col-xl-4">
          <div className="card mb-4">
            <div className="card-header text-center fs-2">Welcome Back</div>

            <form className="form" onSubmit={handleLogin}>
              {/* Display login error if any */}
              {loginError && (
                <div className="alert alert-danger text-center">
                  {loginError}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleTogglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="mb-3 text-end">
                <a href="/forgot_password" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button className="btn btn-success w-100" type="submit">
                Login
              </button>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-decoration-none">
                  Sign Up.
                </a>
              </p>
            </form>

            {/* Show success message if logged in */}
            {isLoggedIn && (
              <div className="alert alert-success text-center mt-3">
                Logged in successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
