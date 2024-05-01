import "../login-page/login-page.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate email input
    if (
      !forgotEmail ||
      !forgotEmail.includes("@") ||
      !forgotEmail.includes(".")
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "https://guptag.pythonanywhere.com/accounts/reset_password/",
        { email: forgotEmail }
      );
      if (response.data && response.data.message) {
        setIsSubmitted(true);
        setSuccessMessage(response.data.message);
        alert("Mail sent successfully!");
      } else {
        setError("Entered mail address not found! Please check and try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setForgotEmail("");
    }
  };

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
          <Link to="/login">Back To Login</Link>
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
