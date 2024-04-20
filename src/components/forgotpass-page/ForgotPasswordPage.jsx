import "../login-page/login-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://guptag.pythonanywhere.com/api/forgot-password/",
        { email }
      );
      setIsSubmitted(true);
      setSuccessMessage(response.data.messsdsaage);
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setForgotEmail("");
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="logindiv">
      <h6 className="form-heading">Forgot Password</h6>
      <form className="form" onSubmit={handleSubmit}>
        <p className="email-helper-text">
          Please enter your e-mail address. You will receive an e-mail along
          with a link which can be used to reset your password.
        </p>
        <input
          className="formm"
          type="email"
          name="email"
          placeholder="Enter Registered Email"
          required
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        <br />
        <input
          className="btn btn-success submitBtn2"
          type="submit"
          value="Send Reset Link"
        />
        <button className="forgotPassword">
          <Link to="/log-in">Back To Login</Link>
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
