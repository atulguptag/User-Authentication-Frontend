import "./sign-up.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Set the CSRF token in the axios configuration
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "https://guptag.pythonanywhere.com",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SignUp | Moviepassa";
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (submissionSuccess) {
      document.getElementById("form").reset();
    }
  }, [submissionSuccess]);

  const postData = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById("form"));
    const pass1 = data.get("password");
    const pass2 = data.get("password2");

    if (pass1 !== pass2) {
      alert("Password fields didn't match!");
      return;
    }

    client
      .post("/accounts/register/", data)
      .then((response) => {
        alert("Account created successfully!");
        setSubmissionSuccess(true);
        navigate("/login");
      })
      .catch((error) => {
        alert("Account already exists!");
      });
  };

  return (
    <section className="section-content padding-y">
      <div className="container-xl d-flex justify-content-center align-items-center mt-5">
        <div className="col-xl-4">
          <div className="card mb-4">
            <div className="card-header text-center fs-2">Sign Up</div>
            <form id="form" className="form" onSubmit={postData}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  pattern="[A-Za-z0-9]{1,25}"
                  title="Username should contain only uppercase and lowercase letters, digits, and be 1 to 25 characters long."
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  title="Please enter a valid email address"
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
                    placeholder="Must be at least 6 characters"
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

              <div className="mb-3">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    id="password2"
                    name="password2"
                    placeholder="Must be at least 6 characters"
                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                    title="Password must contain at least one digit and one lowercase letter, and be at least 8 characters long."
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

              <div className="mb-3">
                <label htmlFor="terms" className="form-group">
                  By signing up, you agree to our{" "}
                  <a href="/">Terms and Conditions</a>.
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Sign Up
              </button>

              <p className="mt-3 text-center">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
