import "./sign-up.css";
import axios from "axios";
import React from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Set the CSRF token in the axios configuration
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
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
  const [errorText] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("showPassword:", showPassword); 
  };

  React.useEffect(() => {
    if (submissionSuccess)
      document.getElementById("form").reset();
  }, [submissionSuccess]);

  function postData(e) {
    e.preventDefault();
    const data = new FormData(document.getElementById("form"));
    const pass1 = data.get("password"); 
    const pass2 = data.get("password2"); 

    if (pass1 !== pass2) {
      alert("Passwords do not match");
      return;
    }
    client
      .post("/accounts/register/", data)
      .then((response) => {
        alert("Your account has been successfully created!");
        setSubmissionSuccess(true); 
      })
      .catch((error) => {
        alert("You already have an account with these credentials.");
      });
  }
  return (
    <div className="signup">
      <form id="form" className="form" onSubmit={postData}>
        <h6 className="signup-heading">Sign Up</h6>
        <p className="para-text">Please fill in this form to create an account!</p>
        <hr />
        {errorText && <p className="error-text">{errorText}</p>}
        <label form="username" className="username-label">
          Username
        </label>
        <br />
        <input
          className="formm2"
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          pattern="[A-Za-z0-9]{1,25}"
          title="Please enter a title that contains only uppercase and lowercase letters, digits, and has a length of 1 to 25 characters."
          required
        />
        <br />
        <label form="email" className="email-label">
          Email
        </label>
        <br />
        <input
          className="formm2"
          type="text"
          id="email"
          name="email"
          placeholder="john@example.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Please enter a valid email address"
          required
        />
        <br />
        <label form="password" className="password-label">
          Password
        </label>
        <br />
        <div className="password-wrapper">
          <input
            className="formm2"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Must be atleast 6 characters"
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
        <label form="password2" className="password2-label">
          Confirm Password
        </label>
        <br />
        <div className="password-wrapper">
          <input
            className="formm2"
            type={showPassword ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="Must be atleast 6 characters"
            pattern="(?=.*\d)(?=.*[a-z]).{8,}"
            title="Password must contain at least one digit and one lowercase letter, and be at least 8 characters long."
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
        <br />
        <label form="terms" className="label-form">
          By signing up, you agree to our{" "}
          <a href="/" target="_blank">
            Terms and Conditions
          </a>
        </label>
        <br />
        <input
          className="btn btn-success submitBtn"
          type="submit"
          value="Sign Up"
        />
      </form>
      <div className="text-center alreadyhave">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup;
